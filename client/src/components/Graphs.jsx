import React from "react";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const getBarGraph = (dataset) =>{
  return(
    <>
    <BarChart
      width={500}
      height={300}
      data={dataset}
      margin={{top: 5,right: 30,left: 20,bottom: 5}}
    >
      <CartesianGrid  />
      <XAxis dataKey="name"/>
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="male" fill="#8884d8" />
      <Bar dataKey="female" fill="#82ca9d" />
    </BarChart>
    </>
  );
}

const getGraphDetails = (heading,dataset,i) =>{
  const tags = [['Female','Male'],['18-21','22-25','above 26'],['Has Experience','No Experience'],['135-200k','201-270k','271-340k','271-340k','above 410k']];
  return(
    <>
      <div className="graph-desc">
              <span className="heading">{heading}</span>
              <div className="groups-count">
                {dataset.map((data,index)=>{
                  return(
                    <div className="grp" key={index}>
                      <span className="count">{(data.male?data.male:0)+(data.female?data.female:0)}</span>
                      <span className="tag">{tags[i][data.name-1]}</span>
                  </div>
                  )
                })}
              </div>
            </div>
            <div className="graph">
              {getBarGraph(dataset)}
            </div>
    </>
  );
}


const Graph = () =>{
    const [genderDataset,setGenderDataset] = useState([]);
    const [ageDataset,setAgeDataset] = useState([]);
    const [workDataset,setWorkDataset] = useState([]);
    const [salaryDataset,setSalaryDataset] = useState([]);

    const getDataset = async(field="") =>{
      const url = "http://localhost:5000/api/analyse?field="+field;
      const res = await fetch(url);
      const data = await res.json();
      if(res.status===500 || !data){
          window.alert(data.error);
      }else{
          if(field === "")
            setGenderDataset(data);
          else if(field === 'age')
            setAgeDataset(data);
          else if(field === 'work')
            setWorkDataset(data);
          else if(field === 'salary')
            setSalaryDataset(data);
      }
  }

    useEffect(()=>{
      getDataset("");
      getDataset("age");
      getDataset("work");
      getDataset("salary");
    },[]);

    return(
        <>
        <div className="graph-container">
          <div className="graph-grp">
              {getGraphDetails("Grouping by Gender", genderDataset,0)}
          </div>
          <hr/>
          <div className="graph-grp">
              {getGraphDetails("Grouping by Age Groups", ageDataset,1)}
          </div>
          <hr/>
          <div className="graph-grp">
              {getGraphDetails("Grouping by Work Experience", workDataset,2)}
          </div>
          <hr/>
          <div className="graph-grp">
              {getGraphDetails("Grouping by Salary", salaryDataset,3)}
          </div>
          <hr/>
        </div> 
        </>
    );
}

export default Graph;