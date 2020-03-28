import XLSX from 'xlsx';
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import Spinner from './spinner'

const Container = styled.div `
display: flex;
flex-direction: column;
`

const Dzone = styled.div `
flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: #eeeeee;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`

const make_cols = refstr => {
    let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
	for(var i = 0; i < C; ++i) o[i] = {name:XLSX.utils.encode_col(i), key:i}
	return o;
};

const SheetJSFT = '.xlsx , ,xlsb , .xlsm , .xls , .xml , .csv , .txt , .ods'


const Reader=(props)=>{

const [file,setFile] =useState({});
const [data,setData] = useState([]);
const [cols, setCols] = useState([]);
const [isLoading,setLoading] = useState(false)


const onDrop = (fl) => {
    setFile(fl[0])
  
   };

  const onDropAccepted =(evt)=>{
    setFile(evt[0])
       
      const fr = new FileReader();
      const rABS = !!fr.readAsBinaryString
  
      fr.onload = (e) => {
        setLoading(true)
          /* Parse data */
          const bstr = e.target.result
          const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
         
         
          /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_json(ws);
          /* Update state */
          setData(data)
          setCols(make_cols(ws['!ref']))
     
            // console.log(JSON.stringify(data, null, 2));
           setLoading(false)
        }

        if (rABS) {
            setLoading(true)
            fr.readAsBinaryString(evt[0]);
          } else {
            fr.readAsArrayBuffer(evt[0]);
          };
  }

    return(
        <div>
             <Dropzone onDrop={onDrop} accept={SheetJSFT} multiple={false} onDropAccepted={onDropAccepted}>
                {({ getRootProps, getInputProps }) => (
                    <Container>
                        <Dzone {...getRootProps()} key="dropzone_1">
                            <input {...getInputProps()} />
                            <p>{ props.text || `Drag 'n' drop some files here, or click to select files`}</p>
                           
                            
                        </Dzone>
                    </Container>)}
             </Dropzone>
            {!isLoading ?
            <div>
            <p> { JSON.stringify(cols)}</p>
            <p>{ JSON.stringify(data)}</p>
             </div> :
             <Spinner />
             }
        </div>
    )

}

export default Reader;