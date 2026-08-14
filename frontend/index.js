// alert("Hello from JS");

const users = [
    {
        "name": "John Doe",
        "gender" : "Male",
        "image" : "john.png"
    },
    {
        "name": "Jane",
        "gender" : "Female",
        "image" : "jane.png"
    }
]
 var curIndex = 0;

 function toggle(){
    if(curIndex == 0)
        curIndex = 1;
    else
        curIndex = 0;
    document.getElementById("card-image").src = users[curIndex].image;
    document.getElementById("card-name").innerText = users[curIndex].name;
    document.getElementById("card-gender").innerText = users[curIndex].gender;
    

 }