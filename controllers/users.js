
import { v4 as uuidv4} from 'uuid';
import fs from'fs';

let testdb;
let chunkJson;

export const getUsers=async (req,res)=>{//get all Data in file users //users جلب كل البيانات من ملف  
   try{
    let users=[];
    const fileNames = fs.readdirSync("users");
  fileNames.forEach(async(txt) => {
    var myData;
       myData=  fs.readFileSync(`users/${txt}`, 'utf-8');
        users.push(await JSON.parse(myData));
        
        if(fileNames[fileNames.length-1]==txt){
           
            res.send( JSON.stringify(users));
        }
    });
}catch(error){
    res.send(error );
}
      
};


export const createUser=(req,res)=>{//this create  user data from req body //انشاء مستخدم عن طريق الطلب كل المعلومات عن طريق جسم الطلب
  
//example http://localhost:5000/users/ ///مثال

//{"KEY":{"name":"SIA","email":"SIA@queen.com","password":"123456","id":"91bd0fef-da69-4dc8-b1ae-20e1957aec44","profileImage":"Queen","follwos":["Abo Sh3rif","Abo Sherif","badroobot","mesho","1"],"follwoing":["Abo Sh3rif","Abo Sherif","badroobot","mesho"],"requestGroup":[{"requestId":"4db9f9d4-b2e6-4815-b621-2e7cd0622b42","email":"queen@roobot.com","groupId":"5"},{"requestId":"d4aaccae-5074-4682-bfb0-28d238be0aa0","email":"queen@roobot.com","groupId":"2"},{"requestId":"572da8a6-2118-4b97-a632-f5ccadc8e6b3","email":"queen@roobot.com","groupId":"19"},{"requestId":"4758bacc-6248-4066-b0f3-13b443019dcc","email":"queen@roobot.com","groupId":"19"}],"points":0,"isVIP":false,"online":false},"email":"SIA@queen.com"}



    var {email,KEY}=req.body;//all data in KEY//  jsonوتكون في صيغت kEYكل البيانات التي تريد حفظها قم بارسالها في
        var IsExisting=false;
        var hashemail=email.toLocaleLowerCase().trim();
    const fileNames = fs.readdirSync("users");
    fileNames.findIndex((txt,index)=>{
        if(fileNames[index]==`${hashemail}.json`){
            IsExisting=true;
        }
    });
    if(IsExisting){
        res.send('The E-mail is already registered.');
    }else{
        const writeStreamData=fs.createWriteStream(`users/${hashemail}.json`);
        writeStreamData.write( JSON.stringify(KEY), (err) => {
            if (err) throw err;
            console.log("done writing....");
          });

          res.status(200).send( JSON.stringify(KEY));
    }
    
};

export  const getUsersById=async (req,res)=>{//get one user by Id//جلب بيانات مستخدم واحد عن طريق البريد الاكتروني وفي حالتي استخدمه كامعرف للمستخدم ID

    const {id}=req.params;
    var index=null;
    var hashemail=id.toLocaleLowerCase().trim();
    const fileNames = fs.readdirSync("users");
    fileNames.findIndex((txt,x)=> {  
        if(fileNames[x]==`${hashemail}.json`){
            index=x;
        }else{
          
        }
    });

    if(index!=null){       
    const readStreamData=fs.createReadStream(`users/${hashemail}.json`,'utf-8');
    readStreamData.on('data',(chunk)=>{
       
    });
    readStreamData.pipe(res);
    }else{
        res.send('The user does not exist');
    }
    
   // res.send(fileNames);
 /*   const fountUser=users.find((user)=>user.id==id);

    if(fountUser==null){
        res.send('No User For this Id');
    }
    res.send(fountUser);
   */
};



export const deletUser=(req,res)=>{
    const {id}=req.params;

    fs.unlink(`users/${id.toLocaleLowerCase()}`,(err)=>{
        if(err) throw err;
    res.status(200).send('Successfully deleted');
    });
    
};


export const read =async(req,res)=>{//to login user 
   
    try {
        const {email,password}=req.body;
        //var hashemail=email.toLocaleLowerCase().trim();
        const readStreamData=fs.createReadStream(`users/${email}.json`);//users/${hashemail}
        readStreamData.on('data', (chunkData) => {
            testdb = chunkData.includes(`${password}`);
            chunkJson = chunkData;

        });
        if(testdb){
            await readStreamData.pipe(res);
        }else{
            res.send('The user does not exist');
        }
       // const success=await bcrypt.compare(password,users[0].hashPassword);
       //res.status(200).json(map);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error});
    }
};

let map = new Map();
export const writeUser  =async (req,res)=>{   //to create New User or SignUp//لانشاء مستخدم جديد او انشاء حساب جديد +_+
    try {
      
        const {name,email,password,profileImage}=req.body;
    
        const userId=uuidv4();
        const hashPassword=password;//await bcrypt.hash(password,10);
        
        var hashemail=email.toLocaleLowerCase().trim();
        var IsExisting=false;
       
        const fileNames = fs.readdirSync("users");
        fileNames.findIndex((txt,index)=>{
            if(fileNames[index]==`${hashemail}.json`){
                IsExisting=true;
            }
        });
        if(IsExisting){
            res.send('The E-mail is already registered.');
        }else{
        const writeStreamData=fs.createWriteStream(`users/${hashemail}.json`);
        var listUserData={
            "name":name,
        "email":email,
        "password":hashPassword,
        "id":userId,
        "profileImage":profileImage,
        "follwos":['badRoOBoT'],
        "follwoing":['badRoOBoT'],
        "requestGroup":[{'requestId':'badRoOBoT','email':'b@b.b','groupId':'1'}],
        "points":0,
        "isVIP":false,
        "online":false
    };
    writeStreamData.write( JSON.stringify(listUserData), (err) => {
        if (err) throw err;
        console.log("done writing....");
      });res.status(200).json(listUserData);
    /*
        writeStreamData.write('{"name":'+'"'+`${name}`+'"');
        writeStreamData.write(',"email":'+'"'+`${email}`+'"');
        writeStreamData.write(',"password":'+'"'+`${password}`+'"');
        writeStreamData.write(',"profileImage":'+'"'+`${profileImage}`+'"');
        writeStreamData.write(',"id":'+'"'+`${userId}`+'"');
        writeStreamData.write(',"points":'+`${0}`);
        writeStreamData.write(',"isVIP":'+`${false}`+'}');
        //writeStreamData.end('');*/
        
    }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error});
    }

};



export const update  =async (req,res)=>{///لتحديث البيانات واجراء التعديلات عليها  //http://localhost:5000/users/up/queen@roobot.com/name/newName or http://localhost:5000/users/up/queen@roobot.com/addrequest/0/0/19 
    try {
       
        var reqData=req.params;
        var email=reqData.email;
        var oldData=fs.readFileSync(`users/${email}.json`);
        var stOldData=JSON.parse(oldData);
        var key=reqData.key;
        var val=reqData.val;
        var key2=reqData.key2;
        var val2=reqData.val2;
        var oldFollwos=stOldData['follwos'];
        var oldFollwoing=stOldData['follwoing'];
        var oldRequestGroup=stOldData['requestGroup'];
        switch(key){
            case 'isVIP':
                if(val=='true'){
                stOldData[key]=true;
                }else{
                    stOldData[key]=false;
                }
                break;
            case 'online':
                if(val=='true'){
                  stOldData[key]=true;
                 }else{
                      stOldData[key]=false;
                   }
                break;
            case 'points':
                stOldData[key]=Number(val);
                break;    
            case 'follwoing':
                 oldFollwoing.push(val);
                 stOldData[key]=oldFollwoing;
                 break; 
            case 'follwos':
                oldFollwos.push(val);
                stOldData[key]=oldFollwos;
                  break;  
            case 'requestGroup':
                var ewe;
                oldRequestGroup.findIndex((e,index)=>{
                    if(oldRequestGroup[index][key2]!=null)
                    {
                    if(oldRequestGroup[index][key2]==val){
                        if(val2=='Delete'){
                            oldRequestGroup.splice(index);//to delete item form list//لحذف عنرص من القائمه
                        }else{
                            ewe=oldRequestGroup[index][key2]=val2//to edit item from list//لتعديل علي عنصر من عناصر القائمه
                        }
                
                       }             
                    }                         
                });
                //var ewe=oldRequestGroup[0][key2]=val2
                var eweewe=[];
                oldRequestGroup.join(ewe);
                stOldData[key]=oldRequestGroup;//لضافه التغير للملف الاصلي// add to original file
                   break;    
            case 'addrequest'://اضافه عنصر جديد
                 var newRequestGroup={
                    "requestId":uuidv4(),"email":email,"groupId":val2
                };
                oldRequestGroup.push(newRequestGroup);
                stOldData['requestGroup']=oldRequestGroup;
                  break; 
             default :
                 stOldData[key]=val;
        }
        
        
        var jsonData=JSON.stringify(stOldData);
        fs.writeFile(`users/${email}.json`,jsonData,finish);
        function finish (e){


            res.send(stOldData);
        }

        
      
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error});
    }

};


export const deleteReq =async(req,res)=>{// to delet list 
   
    try {
        var reqData=req.params;
        var email=reqData.email;
        var oldData= fs.readFileSync(`users/${email}.json`);
        var stOldData=JSON.parse(oldData);
        var key=reqData.key;
        var val=reqData.val;
        var key2=reqData.key2;
        var val2=reqData.val2;
        var oldRequestGroup=stOldData['requestGroup'];
        switch(key){
           case'requestGroup':
           
           var ewe;
           oldRequestGroup.findIndex((e,index)=>{
               if(oldRequestGroup[index][key2]==val){

                if(val2=='Delete'){
                       oldRequestGroup.splice(index);
                }                  
                  }                                      
           });
           //var ewe=oldRequestGroup[0][key2]=val2
           
           
           oldRequestGroup.join(ewe);
           stOldData=oldRequestGroup;
              break;   
        }
        var jsonData=JSON.stringify(stOldData);
        fs.writeFile(`users/${email}.json`,jsonData,finish);
        function finish (e){
            res.send(stOldData);
        }

        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error});
    }
};