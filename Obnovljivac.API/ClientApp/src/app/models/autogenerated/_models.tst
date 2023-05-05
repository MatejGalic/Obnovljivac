${
    using Typewriter.Extensions.Types;
    Template(Settings settings)
    {     
       settings.OutputFilenameFactory = (file) => {
                  var toFolder = "";

                  string fullPath = System.IO.Path.GetDirectoryName(file.FullName).TrimEnd(System.IO.Path.DirectorySeparatorChar);
                  string fromFolder = fullPath.Split(System.IO.Path.DirectorySeparatorChar).Last();

                  if (file.Enums.Count > 0){
                      //toFolder = toFolder + fromFolder + System.IO.Path.DirectorySeparatorChar;
                      toFolder = toFolder + EnumsFolderFS;
                  }
                  
                  var f = file.Name.Replace(".cs", ".ts");
                  f = $"{toFolder}{f[0].ToString().ToLower()}{f.Substring(1)}";

                  //DebugInfo = DebugInfo + Environment.NewLine + "destination file:" + f; 
                  return f;
        };
       settings.IncludeCurrentProject().IncludeProject("Obnovljivac.API"); 
    }

    static string EnumsFolderFS ="enums"+ System.IO.Path.DirectorySeparatorChar;
    static string EnumsFolderTS ="enums/";
     
    static string DebugInfo = "";
    string PrintDebugInfo(File f){
      if (string.IsNullOrEmpty(DebugInfo)) {
         return "";
      }
      return "/*" + Environment.NewLine + "Template debug info: " + DebugInfo + Environment.NewLine + "*/";
    }

	  Type CalculatedType(Type t)
    {
        var type = t;
        while (!type.IsEnumerable && type.IsGeneric) {
            type = type.Unwrap();
        }
        //DebugInfo = DebugInfo + Environment.NewLine + "TYPE:" + type;
        return type;
    }

    Class GetBaseClassIfExists(Class c) {
      var hasBase = c.BaseClass!=null;
      var baseIsAbstractWithoutProps = hasBase && c.BaseClass.IsAbstract && c.BaseClass.Properties.Count()==0;
      var r = hasBase && !baseIsAbstractWithoutProps ? c.BaseClass:null;
      //if(r!=null){
      //    DebugInfo = DebugInfo + Environment.NewLine + $" baseClassWithType: baseClass:{c.BaseClass}; IsAbstract:{c.BaseClass.IsAbstract}; methodsCnt:{ c.BaseClass.Methods.Count()}; propConut:{c.BaseClass.Properties.Count()}: props:{string.Join(",",c.BaseClass.Properties.Select(s=>s.Name))}";  
      //}
      return r;
    }

    string GetBaseClassWithTypeIfExists(Class c) {
      var hasBase = c.BaseClass!=null;
      var baseIsAbstractWithoutProps = hasBase && c.BaseClass.IsAbstract && c.BaseClass.Properties.Count()==0;
      var r = hasBase && !baseIsAbstractWithoutProps ? c.BaseClass + c.BaseClass.TypeArguments :"";

      //var r = c.BaseClass != null ? c.BaseClass + c.BaseClass.TypeArguments : "";
      return r;
    }

 
    Type[] CalculatedModelTypes(Class c)
    {
        
       
        // get base class name if it exists
        string baseClassName = c.BaseClass != null ? c.BaseClass.Name : "";
        var allTypes = c.Properties
            .Select(m => CalculatedType(m.Type))            
            .Where(t => t != null && t.Name != baseClassName && (t.IsDefined || (t.IsEnumerable && !t.IsPrimitive))) // avoid importing base class (it will be imported with calculated base)
            .ToLookup(t => t.ClassName(), t => t);

        var retVal = allTypes                    
                    //.ToDictionary(l => l.Key, l => l)
                    //.SelectMany(kvp => kvp.Value)
                    .ToDictionary(l => l.Key, l => l.First())
                    .Select(kvp => kvp.Value)
                    .Where(kvp =>
                        kvp.Name != "T[]" && kvp.Name != c.Name && kvp.Name != c.Name + "[]" && kvp.Name != "T" 
                        //&& kvp.TypeParameters.Any(s=>s.Name=="T")
                     ) // prevention of importing generic
                    .ToArray();
        return retVal;

    } 
    string CalculatedTypeName(Type t)
    {
        var type = CalculatedType(t);
        return type != null ? type.Name : "void";
    }

    string TypeMap(Property property)
    {
        var type = property.Type;

        if (type.IsPrimitive)
        {
            return type.IsDate ?
                $"new Date(data.{UpperCasePropertyName(property)})" :
                $"data.{UpperCasePropertyName(property)}";
        }
        else
        {
            return type.IsEnumerable ?
                $"data.{UpperCasePropertyName(property)}.map(i => new {type.Name.TrimEnd('[', ']')}(i))" :
                $"new {type.Name}(data.{UpperCasePropertyName(property)})";
        }
    }

    string UpperCasePropertyName(Property property)
    {
       return property.Name[0].ToString().ToUpperInvariant() + property.Name.Substring(1);
    }
    
    string LowerCasePropertyName(Property property)
    {
       return property.Name[0].ToString().ToLowerInvariant() + property.Name.Substring(1);
    }

    string LowerCasePropertyNameWithAttribute(Property property)
    {
      var stringify = property.Attributes.Any(a => a.Name == "TypewriterJsonStringify");
      var prop = property.Name[0].ToString().ToLowerInvariant() + property.Name.Substring(1);

       return stringify? $"JSON.stringify({prop})" : prop;
    }
    //

    string GetPropertiesAsArguments(Class c)
    {
        var result = "";
        for(int i = 0; i< c.Properties.Count; i++)
        {
            var separator = (i == c.Properties.Count -1) ? "" : ", ";
            var prop = c.Properties[i];
            result += $"{LowerCasePropertyName(prop)}: {prop.Type} = null{separator} ";
        }
        return result;
    }

    string LowerCaseTypeName (Type t){
       var name = t.Name[0].ToString().ToLower() + t.Name.Substring(1);
       name = (t.Unwrap().IsEnum ? EnumsFolderTS : "") + name;
       // DebugInfo = DebugInfo + Environment.NewLine + "LowerCaseTypeName:" + t.IsEnum + " name="+name + "   "+t.Name + "  " + t.Unwrap().IsEnum;
       return CalculateName(name);
    }

   string LowerCaseClassName (Class t){
       var retVal = t.Name[0].ToString().ToLower() + t.Name.Substring(1);
       // DebugInfo = DebugInfo + Environment.NewLine + "LowerCaseClassName:" + t.Name;
       return retVal;
    }
    
    string CalculateName(string name){

        string result = name;
        int index = result.IndexOf('<');
        result = index == -1 ? result : result.Substring(0, index);
        index = result.IndexOf('[');
        result = index == -1 ? result : result.Substring(0, index);
        return result;
    }
    
    string GetEnumValue(EnumValue enumItem){
      var desc = enumItem.Attributes.Where(a => a.Name == "EnumAsStringValue").FirstOrDefault();
      // DebugInfo = DebugInfo + Environment.NewLine + "EnumAsStringValue:" + desc.Value;
      return desc != null ? $"'{desc.Value}'" : $"{enumItem.Value}";
    }

}$Classes(f=> f.Namespace.StartsWith("Obnovljivac.API.Models") && !f.Attributes.Select(a=> a.Name.ToLower()).Contains("typewriterignore"))[$CalculatedModelTypes[import {$ClassName} from './$LowerCaseTypeName';
]$GetBaseClassIfExists[import {I$Name, $Name} from './$LowerCaseClassName';
]
// ----------------------------------------------
//  Interface and model
// ----------------------------------------------
export interface I$Name$TypeParameters $GetBaseClassIfExists[extends I]$GetBaseClassWithTypeIfExists {$Properties[
    $LowerCasePropertyName: $Type;]
}

export class $Name$TypeParameters $GetBaseClassIfExists[extends ]$GetBaseClassWithTypeIfExists implements I$Name$TypeParameters {$Properties[
    public $LowerCasePropertyName: $Type;]

    constructor($GetPropertiesAsArguments) {
        $GetBaseClassIfExists[super();]$Properties[
        this.$LowerCasePropertyName = $LowerCasePropertyNameWithAttribute;]
    }
}]
$Enums(f=>(f.Namespace.StartsWith("Obnovljivac.API.Enums") && !f.Attributes.Select(a=> a.Name.ToLower()).Contains("typewriterignore")))[
// ----------------------------------------------
//  Enum: $Name
// ----------------------------------------------
export enum $Name {
          $Values[$Name = $GetEnumValue][,
          ]
}]
$PrintDebugInfo 
