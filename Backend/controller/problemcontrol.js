const {getLanguageById,submitBatch,submitToken} = require("../utils/problemutility")
const Problem = require("../schema/problem")
const Submissions = require("../schema/submission")
const User = require("../schema/user")

const problemCreate = async (req,res) => {
    const {title,description,difficulty,tags,
        visibleTestCases,hiddenTestCases,startCode,
        referenceSolution, problemCreator
    } = req.body;
    try {
         
      for(const {language,completeCode} of referenceSolution){
        const languageId = getLanguageById(language);
          
        // I am creating Batch submission
        const submissions = visibleTestCases.map((testcase)=>({
            source_code:completeCode,
            language_id: languageId,
            stdin: testcase.input,
            expected_output: testcase.output
        }));


        const submitResult = await submitBatch(submissions);
        console.log(submitResult);

        const resultToken = submitResult.map((value)=> value.token);
        
       const testResult = await submitToken(resultToken);

       console.log(testResult);

       for(const test of testResult){
        if(test.status_id!=3){
         return res.status(400).send("Error Occured while testing code");
        }
       }

      }


      // We can store it in our DB

    const userProblem =  await Problem.create({
        ...req.body,
        problemCreator: req.result._id
      });

      res.status(201).send("Problem Saved Successfully");
    }catch (error) {
        res.status(400).send("Error:hnm "+error);
    }
}

const problemUpdate = async (req,res) => {

    const {id}=req.params
    const {title,description,difficulty,tags,
        visibleTestCases,hiddenTestCases,startCode,
        referenceSolution, problemCreator
    } = req.body;
    try {
         
      if(!id)
        throw new Error("Wrong id in problemUpdate")

      const existing_problem = await Problem.findById('id')
      if(!existing_problem)
        throw new Error("Problem don't exist.")
      for(const {language,completeCode} of referenceSolution){
        const languageId = getLanguageById(language);
          
        // I am creating Batch submission
        const submissions = visibleTestCases.map((testcase)=>({
            source_code:completeCode,
            language_id: languageId,
            stdin: testcase.input,
            expected_output: testcase.output
        }));


        const submitResult = await submitBatch(submissions);
        console.log(submitResult);

        const resultToken = submitResult.map((value)=> value.token);
        
       const testResult = await submitToken(resultToken);

       console.log(testResult);

       for(const test of testResult){
        if(test.status_id!=3){
         return res.status(400).send("Error Occured while testing code");
        }
       }

      }


      // We can store it in our DB

    req.body.problemCreator = req.result._id
    const Updated_problem =  await Problem.findByIdAndUpdate(id,{...req.body},{runValidators:true,new:true});

      res.status(201).send("Problem updated\n"+Updated_problem);
    }catch (error) {
        res.status(400).send("Error:hnm "+error);
    }
}

const problemDelete = async (req,res) => {
    const {id} = req.params
    try {
      if(!id)
        throw new Error("Id doesn't exist:")
      const selected_problem = await Problem.findByIdAndDelete(id)
      if(!selected_problem)
        throw new Error("Id isn't db")
      res.status(201).send("Problem Deleted Successfully");
    }catch (error) {
        res.status(400).send("Error:hnm "+error);
    }
}

const problemFetch = async (req,res) => {
    const {id} = req.params
    try {
      if(!id)
        throw new Error("Id doesn't exist:")
      const selected_problem = await Problem.findById(id).select('_id title description difficulty tags visibleTestCases startCode referenceSolution ')
      if(!selected_problem)
        throw new Error("Id isn't db")
      res.status(201).send(selected_problem);
    }catch (error) {
        res.status(400).send("Error:hnm "+error);
    }
}

const getAllProblem = async (req,res) => {
    try {
      const selected_problem = await Problem.find({}).select('_id title difficulty tags');
      if(selected_problem.length==0)
        throw new Error("NO problem db")
      res.status(201).send(selected_problem);
    }catch (error) {
            console.log("heelo")
        res.status(400).send("Error:hnm "+error);
    }
}

const submitCode = async (req,res) => {
  try {
    const userId = req.result._id
    const problemId = req.params.id
    const {language,code}=req.body

    if(!userId||!problemId||!language||!code)
      throw new Error("Some fields are missing")

    if(language==='cpp')
        language='c++'
      

    //fetching so that i can get hidden test cases...
    const problem =  await Problem.findById(problemId);

    //judge0 k0 bhejne se phele db mei save
    const submittedCode = await Submissions.create({
      userId,
      problemId,
      language,
      code,
      status:"pending",
      testCasesTotal:problem.hiddenTestCases.length
    })

    //Now submitting the code to Judge0
    const languageId = getLanguageById(language)
    const submissions=problem.hiddenTestCases.map((testcase)=>({
        source_code:code,
        language_id: languageId,
        stdin: testcase.input,
        expected_output: testcase.output
    }))
    const submitResult = await submitBatch(submissions);
    
    const resultToken = submitResult.map((value)=> value.token);

    const testResult = await submitToken(resultToken);
    
//     language_id: 54,
//     stdin: '2 3',
//     expected_output: '5',
//     stdout: '5',
//     status_id: 3,
//     created_at: '2025-05-12T16:47:37.239Z',
//     finished_at: '2025-05-12T16:47:37.695Z',
//     time: '0.002',
//     memory: 904,
//     stderr: null,
//     token: '611405fa-4f31-44a6-99c8-6f407bc14e73',


    let testCasesPassed = 0;
    let runtime = 0;
    let memory = 0;
    let status = 'accepted';
    let errorMessage = null;

    for(test of testResult)
    {
      if(test.status_id==3){
      testCasesPassed++,
      runtime+=ParseFloat(test.runtime)
      memory=Math.max(memory,test.memory)
      }else if(test.status_id==4){
        status='wrong'
        errorMessage=test.stderr
      }else{
        status='error'
        errorMessage=test.stderr
      }
    }
    
    submittedCode.status   = status;
    submittedCode.testCasesPassed = testCasesPassed;
    submittedCode.errorMessage = errorMessage;
    submittedCode.runtime = runtime;
    submittedCode.memory = memory;
    await submittedCode.save()

    if(!req.result.problemSolved.includes(problemId)){
      req.result.problemSolved.push(problemId)
      await req.result.save()
    }

    res.send(submittedCode)
  } catch (error) {
    res.send("Error"+error)
  }
}

const runCode = async (req,res) => {
  try {
    const userId = req.result._id
    const problemId = req.params.id
    const {language,code}=req.body

    if(!userId||!problemId||!language||!code)
      throw new Error("Some fields are missing")

    if(language==='cpp')
        language='c++'

    //fetching so that i can get hidden test cases...
    const problem =  await Problem.findById(problemId);

    //Now submitting the code to Judge0
    const languageId = getLanguageById(language)
    const submissions=problem.visibleTestCases.map((testcase)=>({
        source_code:code,
        language_id: languageId,
        stdin: testcase.input,
        expected_output: testcase.output
    }))
    const submitResult = await submitBatch(submissions);
    
    const resultToken = submitResult.map((value)=> value.token);

    const testResult = await submitToken(resultToken);
    res.send(testResult)
  } catch (error) {
    res.send("Error"+error)
  }
}

const solvedProblem = async (req,res)=> {
  try {
    const userId = req.result._id
    const user = await User.findById(userId).populate({
    path:'problemSolved',
    select:'title difficulty tags'
  })
  res.status(200).send(user.problemSolved)
  } catch (error) {
    res.send("Problem Db error"+error)
  }
}

const submissionsPerProblem = async (req,res) => {
  try {
    const userId = req.result._id
    const problemId = req.params.pid

    const ans = await Submissions.find({userId,problemId})
    if(ans.length==0)
      res.send("No submission till now")
    res.send(ans)
  } catch (error) {
    res.send("Error"+err)
  }
}
module.exports = {problemCreate,
  problemUpdate,
  problemDelete,
  problemFetch,
  getAllProblem,
  submitCode,
  runCode,
  solvedProblem,
  submissionsPerProblem
}