export const XmlGenerator = (data: any, rootTagName: any, sections: any, questions: any) => {
    var xmlString = "<" + rootTagName + "></" + rootTagName + ">";
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlString, "text/xml");
    Object.keys(data).map((sectionId) => {
      let currentSection = sections.filter((each: any) => each.Id == sectionId);
      if (currentSection.length) {
        let section = currentSection[0];
        if (section.IsRepeatable) {
          let sectionTag = xmlDoc.createElement(section?.TagName);
          data[sectionId]?.map((eachRepeatSection: any,index: any) => {
            var repeatSectionTag = xmlDoc.createElement(
              section.RepeatSectionTagName||`${section?.TagName}${index+1}`
            );
            Object.keys(eachRepeatSection).map((VarName) => {
              let CurrentQuestionInfo = questions?.filter(
                (each: any) => each.TagName == VarName
              );
              let questionTagElement = xmlDoc.createElement(
                CurrentQuestionInfo[0]?.TagName
              );
              let text = xmlDoc.createTextNode(eachRepeatSection[VarName]);
  
              if (CurrentQuestionInfo[0]?.VarType == "SELECT") {
                text = xmlDoc.createTextNode(eachRepeatSection[VarName]?.label);
              }
              questionTagElement.appendChild(text);
  
              questionTagElement.setAttribute(
                "varname",
                CurrentQuestionInfo[0].VarName
              );
              repeatSectionTag.appendChild(questionTagElement);
            });
            sectionTag.appendChild(repeatSectionTag);
          });
          xmlDoc.documentElement.appendChild(sectionTag);
        } else {
          let sectionTag = xmlDoc.createElement(section?.TagName);
 
          Object.keys(data[sectionId]).map((varName) => {
            let CurrentQuestionInfo = questions?.filter(
              (each: any) => each.TagName == varName
            );
            let questionTagElement = xmlDoc.createElement(
              CurrentQuestionInfo[0]?.TagName
            );
            let text = xmlDoc.createTextNode(data[sectionId][varName]);
            if (CurrentQuestionInfo[0]?.VarType == "SELECT") {
              text = xmlDoc.createTextNode(data[sectionId][varName]?.label);
            }
            questionTagElement.appendChild(text);
  
            questionTagElement.setAttribute(
              "varname",
              CurrentQuestionInfo[0].VarName
            );
            sectionTag.appendChild(questionTagElement);
          });
          xmlDoc.documentElement.appendChild(sectionTag);
        }
      }
    });
  
    var serializer = new XMLSerializer();
    var finalXmlString = serializer.serializeToString(xmlDoc);
    return finalXmlString;
  };
  
  // var node = xmlDoc.createElement("heyHo");
  // node.setAttribute("id", "myId");
  // xmlDoc.documentElement.appendChild(node);
  
  // let newEle = xmlDoc.createElement("edition");
  // ////////create text
  // let newText = xmlDoc.createTextNode("first");
  // ////setting text inside tagElement
  // newEle.appendChild(newText);
  // ////nesting an element
  // xmlDoc.getElementsByTagName("heyHo")[0].appendChild(newEle);
  
  // var serializer = new XMLSerializer();
  // var xmlString = serializer.serializeToString(xmlDoc);
  
  // // console.log(xmlString, "xml string");
  
  // ////////
  