const axios = require('axios');

const getLanguageById = (lang)=>{
    const language = {
        "c++":54,
        "java":62,
        "javascript":63
    }
    return language[lang.toLowerCase()];
}


const submitBatch = async (submissions)=>{
const options = {
  method: 'GET',
  url: 'https://judge0-ce.p.rapidapi.com/about',
  headers: {
    'x-rapidapi-key': '11d7d90583msh9d6335a356a0773p13a5c2jsn6d7d24d7f9a2',
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
  },
  data: {
    submissions
  }
};


async function fetchdata() {
  try {
    const response = await axios.request(options)
    return response.data
  } catch (error) {
    console.error("error"+error)
  }
}
return await fetchdata();

}


const submitToken = async (submissions) => {
  

const options = {
  method: 'POST',
  url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
  params: {
    base64_encoded: 'true'
  },
  headers: {
    'x-rapidapi-key': '11d7d90583msh9d6335a356a0773p13a5c2jsn6d7d24d7f9a2',
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {
    submissions
  }
};

async function fetchData() {
	try {
		const response = await axios.request(options);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}


 while(true){

 const result =  await fetchData();

  const IsResultObtained =  result.submissions.every((r)=>r.status_id>2);

  if(IsResultObtained)
    return result.submissions;

  
  await waiting(1000);
}
}

module.exports = {getLanguageById,submitBatch,submitToken};
