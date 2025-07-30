import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axiosClient from "../utils/axiosClient"
import HintAi from '../components/ProblemPage/HintAi';
import Editorial from '../components/ProblemPage/Editorial';
import { NotebookText,TvMinimalPlay,Users,HandHelping, ThumbsUp,History, CodeXml, FlaskConical, Zap} from 'lucide-react';
import SubmissionHistory from '../components/ProblemPage/SubmissionHistory';
import Loading from '../components/loading';
import { NavLink } from 'react-router';
import Stopwatch from '../components/ProblemPage/stopwatch';
import SolutionTab from '../components/ProblemPage/SolutionTab';
import RunResult from '../components/ProblemPage/RunResult';
import SubmitResult from '../components/ProblemPage/SubmitResult';
import CodeEditor from '../components/ProblemPage/CodeEditor';

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

  const [isHintAiOpen, setIsHintAiOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [activeLeftTab, setActiveLeftTab] = useState('description');
  const [activeRightTab, setActiveRightTab] = useState('code');
  
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

        // console.log(initialCode);
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

  

  const handleLike = async () => {
    try {
      const response = await axiosClient.get(`/problem/like/${problemId}`)
      const {liked , totalLikes} = response.data
      setProblem(prev => ({ ...prev, likes: totalLikes }));
      setIsLiked(liked)
      // console.log(isLiked)
      // setProblem(problem.push(totalLikes))
    } catch (error) {
      
    }
  }
  
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
  return (
    <div className="h-screen flex bg-gradient-to-bl from-gray-200 to-black">
      <nav id="navbar" className="navbar bg-gradient-to-l from-gray-500 via-gray-800 to-gray-950 border-b-2 border-black  px-4 fixed top-0 left-0 z-40">
                <div className="flex-1">
                    <NavLink to="/problemset" className="btn btn-ghost text-xl  hover:bg-transparent hover:text-purple-400">&lt;-  Problem List</NavLink>
                </div>
                <div className="flex flex-row justify-between  w-[50vw] ">
                  <div className="tabs tabs-bordered bg-base-200">
          <button 
            className={`tab ${activeRightTab === 'code' ? 'tab-active text-green-300' : ''}`}
            onClick={() => setActiveRightTab('code')}
          >
            <CodeXml/>
            Code
          </button>
          <button 
            className={`tab ${activeRightTab === 'testcase' ? 'tab-active text-red-300' : ''}`}
            onClick={() => setActiveRightTab('testcase')}
          >
            <FlaskConical/>
            Testcase
          </button>
          <button 
            className={`tab ${activeRightTab === 'result' ? 'tab-active text-purple-300' : ''}`}
            onClick={() => setActiveRightTab('result')}
          >
            <Zap/>
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
        <div className="tabs tabs-bordered bg-gradient-to-tl from-gray-500 to-black p-4">
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
                    {problem.tags.map((tag, idx) => (
    <span key={idx} className="badge badge-primary">{tag}</span>
  ))}
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
                  <div className="absolute bottom-5 left-4 z-10 flex items-center gap-2 bg-black">
  <div className="tooltip tooltip-right" data-tip={isLiked ? "Unlike" : "Like"}>
    <button
      className="btn btn-ghost btn-circle bg-black"
      onClick={handleLike}
      aria-label={isLiked ? "Unlike this problem" : "Like this problem"}
    >
      <ThumbsUp
         className={`w-5 h-5 transition-colors duration-200 ${
    isLiked
      ? 'text-blue-500 fill-blue-500' // When liked, set both text and fill to blue
      : 'text-gray-400 fill-gray-400' // When not liked, set both text and fill to gray
  }`}
      />
    </button>
  </div>
  <span className="text-lg font-semibold text-gray-300">
    {problem.likes}
  </span>
</div>
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
                <SolutionTab problem={problem}/>
              )}

              {activeLeftTab === 'submissions' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">My Submissions</h2>
                  <div className="text-gray-500">
                    <SubmissionHistory problemId={problemId}/>
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
            <CodeEditor code={code} 
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            setLoading={setLoading}
            setActiveRightTab={setActiveRightTab}
             setRunResult={setRunResult} 
            //  setSubmitResult={setSubmitResult}
             setCode={setCode} 
             submitResult={submitResult} 
             setIsRunning={setIsRunning}
             setSubmitResult={setSubmitResult}
             problemId={problemId} 
             loading={loading}
             problem={problem} />
          )}

          {activeRightTab === 'testcase' && (
            <RunResult runResult={runResult}/>
          )}

          {activeRightTab === 'result' && (
            <SubmitResult submitResult={submitResult}/>
          )}
        </div>
      </div>
      {isHintAiOpen && (
  <div className="fixed inset-y-0 right-0 w-1/3 bg-gradient-to-tl from-green-800 to-black z-40 transform transition-transform duration-300 ease-in-out border-l border-base-300 overflow-y-auto p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">AI Hint</h2>
      <button
        className="btn btn-sm btn-ghost"
        onClick={() => setIsHintAiOpen(false)}
        aria-label="Close"
      >
        ✕
      </button>
    </div>
    {problem ? (
      <HintAi problem={problem} />
    ) : (
      <p>Loading problem details...</p>
    )}
  </div>
)}
      <div className="fixed bottom-4 right-4 z-50">
  <button
    className="btn btn-primary btn-circle shadow-lg"
    onClick={() => setIsHintAiOpen(!isHintAiOpen)}
    aria-label="Open AI Hint"
  >
    <HandHelping size={24} />
  </button>
</div>
    </div>
  );
};

export default ProblemPage;