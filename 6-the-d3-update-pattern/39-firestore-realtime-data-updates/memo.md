## **Listen to data loading/changing**

![onSnapshot()](./pic/01.png) 

## **Analyzing the way to get data from it**

![docChanges()](./pic/02.png) 

## **implementing it to render the barchart**

![implementing to render barchart](./pic/03.png) 

- In the above codes, only data.push() is used, so each time the onSnapshot callback is called, it only pushes data from database to the const data, not updating the existing data or deleting it.

  - We will solve it in next lecture.
