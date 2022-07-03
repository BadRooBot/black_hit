#this is first project with node js

In this project use json files as data bases where application data is stored you can easily create, delete or modify data 

with this project You can create and read data from server 
#1 get all Data in file users
#2 create  user data from req body //انشاء مستخدم عن طريق الطلب كل المعلومات عن طريق جسم الطلب
  
example http://localhost:5000/users/ ///مثال

{"KEY":{"name":"SIA","email":"SIA@queen.com","password":"123456","id":"91bd0fef-da69-4dc8-b1ae-20e1957aec44","profileImage":"Queen","follwos":["Abo Sh3rif","Abo Sherif","badroobot","mesho","1"],"follwoing":["Abo Sh3rif","Abo Sherif","badroobot","mesho"],"requestGroup":[{"requestId":"4db9f9d4-b2e6-4815-b621-2e7cd0622b42","email":"queen@roobot.com","groupId":"5"},{"requestId":"d4aaccae-5074-4682-bfb0-28d238be0aa0","email":"queen@roobot.com","groupId":"2"},{"requestId":"572da8a6-2118-4b97-a632-f5ccadc8e6b3","email":"queen@roobot.com","groupId":"19"},{"requestId":"4758bacc-6248-4066-b0f3-13b443019dcc","email":"queen@roobot.com","groupId":"19"}],"points":0,"isVIP":false,"online":false},"email":"SIA@queen.com"}


#3 get one user by Id or any data by Id

#4 update data 
example
http://localhost:5000/users/up/queen@roobot.com/name/newName or http://localhost:5000/users/up/queen@roobot.com/addrequest/0/0/19


#4 delete data from list


~_~ created by Mahmoud Sherif ~_~

