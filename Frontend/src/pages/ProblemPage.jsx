import { useState, useEffect, useRef } from 'react';
// import { useForm } from 'react-hook-form';
import Editor from '@monaco-editor/react';
import { useParams } from 'react-router';
import axiosClient from "../utils/axiosClient"
import HintAi from '../components/HintAi';
import Editorial from '../components/Editorial';
import { NotebookText,TvMinimalPlay,Users,HandHelping, ThumbsUp,History,Terminal,Timer, Cpu,BookCheck,TestTubeDiagonal, AlarmClock} from 'lucide-react';
import SubmissionHistory from '../components/SubmissionHistory';
import Loading from '../components/loading';
import { NavLink } from 'react-router';
import Stopwatch from '../components/stopwatch';

const mapLang = {
  'cpp': 'C++',
  'python': 'Python',
  'javascript': 'Javascript'
};


const ProblemPage = () => {
  const [problem, setProblem] = useState(null);
  const [isLiked,setIsLiked] = useState(false)
  const [likedProblems,setLikedProblems] = useState([])
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('');

  const [isRunning, setIsRunning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [activeLeftTab, setActiveLeftTab] = useState('description');
  const [activeRightTab, setActiveRightTab] = useState('code');
  const editorRef = useRef(null);
  let {problemId}  = useParams();

//   const { handleSubmit } = useForm();

  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);
      try {
        
        const response = await axiosClient.get(`/problem/problembyId/${problemId}`);
        
        // const initialCode = response.data.startCode.find((sc) => {
        
        // if (sc.language == "C++" && selectedLanguage == 'cpp')
        // return true;
        // else if (sc.language == "Python" && selectedLanguage == 'python')
        // return true;
        // else if (sc.language == "Javascript" && selectedLanguage == 'javascript')
        // return true;


        // return false;
        // })?.initialCode || 'Hello';

        const initialCode = response.data.startCode.find((sc) => 
        sc.language.toLowerCase() === mapLang[selectedLanguage].toLowerCase()
        )?.initialCode || 'Hello';

        // console.log(initialCode);
        setProblem(response.data);        

        console.log(initialCode);
        setCode(initialCode);
        setLoading(false);
        
      } catch (error) {
        console.error('Error fetching problem:', error);
        setLoading(false);
      }
    };

    fetchProblem();


    const fetchUserLikes = async()=>{
      const {data} = await axiosClient.get('/problem/likedproblems')
      setLikedProblems(data)
    }
    fetchUserLikes()
  }, [problemId]);

  // Update code when language changes
  useEffect(() => {
    if (problem) {
      // const initialCode = problem.startCode.find(sc => sc.language === selectedLanguage)?.initialCode || '';
      const initialCode = problem.startCode.find(
      sc => sc.language.toLowerCase() === mapLang[selectedLanguage].toLowerCase()
    )?.initialCode || '';
      setCode(initialCode);
      console.log(initialCode)
    }
  }, [selectedLanguage, problem]);


  useEffect(() => {
  if (problem && likedProblems.length > 0) {
    const likedIds = likedProblems.map(p => p._id.toString());
    if (likedIds.includes(problem._id.toString())) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }
}, [problem, likedProblems]);

  const handleEditorChange = (value) => {
    setCode(value || '');
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    // console.log('Available languages:', monaco.languages.getLanguages());
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleRun = async () => {
    setLoading(true);
    setRunResult(null);
    
    try {
      const response = await axiosClient.post(`/problem/run/${problemId}`, {
        code,
        language: selectedLanguage
      });
      // console.log(response)
      setRunResult(response.data);
      setLoading(false);
      setActiveRightTab('testcase');
      
    } catch (error) {
      console.error('Error running code:', error);
      setRunResult({
        success: false,
        error: 'Internal server error'
      });
      setLoading(false);
      setActiveRightTab('testcase');
    }
  };

  const handleLike = async () => {
    try {
      const response = await axiosClient.get(`/problem/like/${problemId}`)
      const {liked , totalLikes} = response.data
      setProblem(prev => ({ ...prev, likes: totalLikes }));
      setIsLiked(liked)
      console.log(isLiked)
      // setProblem(problem.push(totalLikes))
    } catch (error) {
      
    }
  }
  const handleSubmitCode = async () => {
    setLoading(true);
    setIsRunning(false)
    setSubmitResult(null);
    
    try {
        const response = await axiosClient.post(`/problem/submit/${problemId}`, {
        code:code,
        language: selectedLanguage
      });

       setSubmitResult(response.data);
       setLoading(false);
       setActiveRightTab('result');
      
    } catch (error) {
      console.error('Error submitting code:', error);
      setSubmitResult(null);
      setLoading(false);
      setActiveRightTab('result');
    }
  };

  const getLanguageForMonaco = (lang) => {
    switch (lang) {
      case 'javascript': return 'javascript';
      case 'java': return 'java';
      case 'cpp': return 'cpp';
      case 'python': return 'python';
      default: return 'javascript';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'hard': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  if (loading && !problem) {
    return (
      <Loading/>
    );
  }

 
// const likedIds = likedProblems.map(p => p._id.toString())
//   if(likedIds.includes(problem._id.toString())){
//     setIsLiked(true)
//   }
  return (
    <div className="h-screen flex bg-gradient-to-bl from-gray-200 to-black">
      <nav id="navbar" className="navbar bg-gradient-to-l from-gray-500 via-gray-800 to-gray-950 border-b-2 border-black  px-4 fixed top-0 left-0 z-40">
                <div className="flex-1">
                    <NavLink to="/problemset" className="btn btn-ghost text-xl  hover:bg-transparent hover:text-purple-400">&lt;-  Problem List</NavLink>
                </div>
                <div className="flex flex-row justify-between  w-[50vw] ">
                  <div className="tabs tabs-bordered bg-base-200 px-4">
          <button 
            className={`tab ${activeRightTab === 'code' ? 'tab-active' : ''}`}
            onClick={() => setActiveRightTab('code')}
          >
            Code
          </button>
          <button 
            className={`tab ${activeRightTab === 'testcase' ? 'tab-active' : ''}`}
            onClick={() => setActiveRightTab('testcase')}
          >
            Testcase
          </button>
          <button 
            className={`tab ${activeRightTab === 'result' ? 'tab-active' : ''}`}
            onClick={() => setActiveRightTab('result')}
          >
            Result
          </button>
        </div>
        <div>
                      <Stopwatch isRunning={isRunning} setIsRunning={setIsRunning}/>
                    </div>
                </div>
                
            </nav>

      {/* Left Panel */}
      <div className="w-2/5 flex flex-col border-r border-white mt-15">
        {/* Left Tabs */}
        <div className="tabs tabs-bordered bg-gradient-to-tl from-gray-500 to-black px-4">
          <button 
            className={`tab ${activeLeftTab === 'description' ? 'tab-active' : ''}`}
            onClick={() => setActiveLeftTab('description')}
          >
            <NotebookText />Description
          </button>
          <button 
            className={`tab ${activeLeftTab === 'editorial' ? 'tab-active' : ''}`}
            onClick={() => setActiveLeftTab('editorial')}
          >
           <TvMinimalPlay /> Editorial
          </button>
          <button 
            className={`tab ${activeLeftTab === 'solutions' ? 'tab-active' : ''}`}
            onClick={() => setActiveLeftTab('solutions')}
          >
            <Users/>Solutions
          </button>
          <button 
            className={`tab ${activeLeftTab === 'submissions' ? 'tab-active' : ''}`}
            onClick={() => setActiveLeftTab('submissions')}
          >
            <History/>Submissions
          </button>
          <button 
            className={`tab ${activeLeftTab === 'HintAi' ? 'tab-active' : ''}`}
            onClick={() => setActiveLeftTab('HintAi')}
          >
           <HandHelping /> HintAi
            </button>
        </div>

        {/* Left Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide p-6">
          {problem && (
            <>
              {activeLeftTab === 'description' && (
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <h1 className="text-2xl font-bold">{problem.title}</h1>
                    <div className={`badge badge-outline ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                    </div>
                    <div className="badge badge-primary">{problem.tags}</div>
                  </div>

                  <div className="prose max-w-none">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {problem.description}
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Examples:</h3>
                    <div className="space-y-4">
                      {problem.visibleTestCases.map((example, index) => (
                        <div key={index} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md p-4 ">
                          <h4 className="font-semibold mb-2 text-gray-400 ">Example {index + 1}:</h4>
                          <div className="space-y-2 text-sm font-mono">
                            <div><strong className='text-blue-400'>Input:</strong> {example.input}</div>
                            <div ><strong className='text-blue-400'>Output:</strong> {example.output}</div>
                            <div ><strong className='text-cyan-400'>Explanation:</strong> {example.explanation}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={`absolute bottom-5 left-4 font-bold text-white flex btn ${isLiked? "btn-secondary": "btn-primary" } p-1`} onClick={handleLike}><ThumbsUp/>{problem.likes}</div>
                </div>
              )}

              {activeLeftTab === 'editorial' && (
                <div className="prose max-w-none">
                  <h2 className="text-xl font-bold mb-4">Editorial</h2>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {<Editorial secureUrl={problem.secureUrl} thumbnailUrl={problem.thumbnailUrl} duration={problem.duration}/>}
                  </div>
                </div>
              )}

              {activeLeftTab === 'solutions' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Solutions</h2>
                  <div className="space-y-6">
                    {problem.referenceSolution?.map((solution, index) => (
                      <div key={index} className="border border-base-300 rounded-lg">
                        <div className="bg-base-200 px-4 py-2 rounded-t-lg">
                          <h3 className="font-semibold">{problem?.title} - {solution?.language}</h3>
                        </div>
                        <div className="p-4">
                          <pre className="bg-base-300 p-4 rounded text-sm overflow-x-auto">
                            <code>{solution?.completeCode}</code>
                          </pre>
                        </div>
                      </div>
                    )) || <p className="text-gray-500">Solutions will be available after you solve the problem.</p>}
                  </div>
                </div>
              )}

              {activeLeftTab === 'submissions' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">My Submissions</h2>
                  <div className="text-gray-500">
                    <SubmissionHistory problemId={problemId}/>
                  </div>
                </div>
              )}

              {activeLeftTab === 'HintAi' && (
                <div className="prose max-w-none">
                  <h2 className="text-xl font-bold mb-4">Ask AI</h2>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    <HintAi problem={problem}></HintAi>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-3/5 flex flex-col mt-15 bg-gradient-to-l from-gray-500 via-gray-800 to-gray-950">
        {/* Right Content */}
        <div className="flex-1 flex flex-col">
          {activeRightTab === 'code' && (
            <div className="flex-1 flex flex-col">
              {/* Language Selector */}
              <div className="flex justify-between items-center p-4 border-b border-base-300">
                <div className="flex gap-2">
                  {['javascript', 'python', 'cpp'].map((lang) => (
                    <button
                      key={lang}
                      className={`btn btn-sm ${selectedLanguage === lang ? 'text-primary' : 'btn-ghost'}`}
                      onClick={() => handleLanguageChange(lang)}
                    >
                      {lang === 'cpp' ? 'C++' : lang === 'javascript' ? 'JavaScript' : 'Python'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Monaco Editor */}
              <div className="flex-1">
                <Editor
                  height="100%"
                  language={getLanguageForMonaco(selectedLanguage)}
                  value={code}
                  onChange={handleEditorChange}
                  onMount={handleEditorDidMount}
                  theme="vs-dark"
                  options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    insertSpaces: true,
                    wordWrap: 'on',
                    lineNumbers: 'on',
                    glyphMargin: false,
                    folding: true,
                    lineDecorationsWidth: 10,
                    lineNumbersMinChars: 3,
                    renderLineHighlight: 'line',
                    selectOnLineNumbers: true,
                    roundedSelection: false,
                    readOnly: false,
                    cursorStyle: 'line',
                    mouseWheelZoom: true,
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-t border-base-300 flex justify-between">
                  <div className="flex gap-2">
                    <button
                    className={`btn btn-outline btn-sm ${loading ? 'loading' : ''}`}
                    onClick={handleRun}
                    disabled={loading}
                  > Run</button>
                  <button
                    className={`btn btn-primary btn-sm ${loading ? 'loading' : ''}`}
                    onClick={handleSubmitCode}
                    disabled={loading}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeRightTab === 'testcase' && (
            <div className="flex-1 p-4 overflow-y-auto">
              <h3 className="font-semibold mb-4">Test Results</h3>
              {runResult ? (
                <div className={`alert ${runResult.success ? 'alert-success' : 'alert-error'} mb-4`}>
                  <div>
                    {runResult.success ? (
                      <div>
                        <h4 className="font-bold flex items-center gap-1"><BookCheck /> All test cases passed!</h4>
                        <p className="text-sm mt-2 flex items-center gap-1"><Timer/> Runtime: {runResult.runtime+" sec"}</p>
                        <p className="text-sm flex items-center gap-1"><Cpu/> Memory: {runResult.memory+" KB"}</p>
                        
                        <div className="mt-4 space-y-2">
                          {runResult.testCases.map((tc, i) => (
                            <div key={i} className="bg-gray-200 p-5 rounded text-s w-142">
                              <div className="font-mono">
                                <div className='inline'><strong><Terminal className='inline'/>TestCase:</strong> {i+1}</div>
                                <hr></hr>
                                <div><strong>Input:</strong> {tc.stdin}</div>
                                <div><strong>Expected:</strong> {tc.expected_output}</div>
                                <div><strong>Output:</strong> {tc.stdout}</div>
                                <div><strong>Runtime:</strong> {tc.time} sec</div>
                                <div><strong>Memory:</strong> {tc.memory} KB</div>
                                <div className={'text-green-500'}>
                                  {'✓ Passed'}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h4 className="font-bold shadow-2xl shadow-black">❌ Error</h4>
                        <div className="mt-4 space-y-2">
                          {runResult.testCases?.map((tc, i) => (
                            <div key={i} className="bg-gray-200 p-5 rounded text-s w-142">
                              <div className="font-mono">
                                <div className='inline'><strong><Terminal className='inline'/>TestCase:</strong> {i+1}</div>
                                <hr></hr>
                                <div><strong>Input:</strong> {tc.stdin}</div>
                                <div><strong>Expected:</strong> {tc.expected_output}</div>
                                <div><strong>Output:</strong> {tc.stdout}</div>
                                <div className={tc.status_id==3 ? 'text-green-600' : 'text-red-600'}>
                                  {tc.status_id==3 ? '✓ Passed' : '✗ Failed'}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-gray-400">
                  Click "Run" to test your code with the example test cases.
                  {/* {problem.visibleTestCases.map((testcase)=>{
                    testCase
                  })} */}
                </div>
              )}
            </div>
          )}

          {activeRightTab === 'result' && (
            <div className="flex-1 p-4 overflow-y-auto">
              <h3 className="font-semibold mb-4">Submission Result</h3>
              {submitResult ? (
                <div className={`alert ${submitResult.accepted ? 'alert-success' : 'alert-error'}`}>
                  <div>
                    {submitResult.accepted ? (
                      <div>
                        <h4 className="font-bold text-lg">🎉 Accepted</h4>
                        <div className="mt-4 space-y-2 bg-white rounded-2xl p-3">
                          <p className='flex items-center gap-1'><TestTubeDiagonal/>Test Cases Passed: {submitResult.passedTestCases}/{submitResult.totalTestCases}</p>
                          <hr></hr>
                          <p className='flex items-center gap-1'><Timer/>Runtime: {submitResult.runtime + " sec"}</p>
                          <p className='flex items-center gap-1'><Cpu/>Memory: {submitResult.memory + "KB"} </p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h4 className="font-bold text-lg">❌ {submitResult.error}</h4>
                        <div className="mt-4 space-y-2">
                          <p>Test Cases Passed: {submitResult.passedTestCases}/{submitResult.totalTestCases}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-gray-400">
                  Click "Submit" to submit your solution for evaluation.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;