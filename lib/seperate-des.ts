export const seperateDes = (des: string) => {
  let tempDiv = document.createElement("div");
  tempDiv.innerHTML = des;

  let listItems = tempDiv.querySelectorAll("li");
  if (listItems.length === 0) {
    des = des.replace(/<\/?p>/g, "");
    return [des];
  }
  let resultArray = [];
  for (let i = 0; i < listItems.length; i++) {
    let itemHtml = listItems[i].innerHTML;
    itemHtml = itemHtml.replace(/<\/?p>/g, "");
    resultArray.push(itemHtml);
  }

  return resultArray;
};
