
const weekdays= ["Select the Day of Week","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function getToday()
{
    const dt= new Date();
    return dt.getDay() + 1;
}

const ListEdit = {

    addLecture: async function(uuid,course_code,course_name,link1,link2,starttime,endtime,day,type) {

        var list = await localStorage.getItem(type);
        if(list===null)
        {
                list={};
                await localStorage.setItem(type,JSON.stringify(list));
        }
        else
        {
                list =  JSON.parse(list);
        }

        var newId;
        if(uuid==="")
        {
            const date = new Date();
            newId = date.valueOf();
        }
        else
        {
            newId = uuid;
        }

        list.aaaa ={
            a:"a",
            b:"b",
            c:"c",
        }

        const object = {
             COURSE_CODE: course_code,
             COURSE_NAME: course_name,
             LINK1:link1,
             LINK2:link2,
             START_TIME:starttime,
             END_TIME:endtime,
             DAY:day,
        }

        list[newId] = object;
        await localStorage.setItem(type,JSON.stringify(list));
    },

    getLectures: async function(type,filter) {

        const today = weekdays[getToday()];
        var list = await localStorage.getItem(type);
        if(list===null)
        {
                list={};
                await localStorage.setItem(type,JSON.stringify(list));

        }
        else
        {
                list =  JSON.parse(list);
        }
        var datalist =[];
        var editedItem;
        Object.entries(list).forEach(item => {
            if(item[0]!=='aaaa') 
            {
                if(filter===true){
                    if(item[1].DAY===today)
                    {
                        editedItem = item[1];
                        editedItem["UUID"]=item[0];
                        datalist.push(editedItem);
                    }
                }
                else{
                        editedItem = item[1];
                        editedItem["UUID"]=item[0];
                        datalist.push(editedItem);
                }
            }
        });
        
        return datalist;
    },

    clearTemp: function(){
        localStorage.setItem("temp","");
    },

    deleteEntry: async function(type,uuid){

        var list = await JSON.parse(await localStorage.getItem(type));
        
        delete list[uuid];

        localStorage.setItem(type,JSON.stringify(list));

    }
}

export default ListEdit;