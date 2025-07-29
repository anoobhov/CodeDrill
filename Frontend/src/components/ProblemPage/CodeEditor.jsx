import Editor from '@monaco-editor/react';
import {RefreshCw} from 'lucide-react';
import { useState, useRef } from 'react';
import axiosClient from "../../utils/axiosClient"
function CodeEditor({setCode,problemId,problem,code,selectedLanguage,setRunResult,setSubmitResult,setSelectedLanguage,setLoading,setActiveRightTab,loading,setIsRunning})
{
  const [editorTheme, setEditorTheme] = useState('vs-dark');
  const [fontSize, setFontSize] = useState(14);
  
  const editorRef = useRef(null);
  const [cooldown, setCooldown] = useState(0);
  const cooldownRef = useRef(null);

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
  const handleReset = (language) => {
  if (!problem) return;
  const initialCode = problem.startCode.find(
    sc => sc.language.toLowerCase() === mapLang[language].toLowerCase()
  )?.initialCode || '';
  setCode(initialCode);
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


  const handleSubmitCode = async () => {
     if (cooldown > 0) return;

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
    }finally{
      setLoading(false);
    // Start cooldown timer
    setCooldown(15);
    cooldownRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(cooldownRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
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

  return(
    <div className="flex-1 flex flex-col">
              {/* Language Selector */}
              <div className="flex justify-between items-center p-4 border-b border-base-300">
                <div className="flex gap-2">
                  <select
    className="select select-sm"
    value={selectedLanguage}
    onChange={(e) => handleLanguageChange(e.target.value)}
  >
    <option value="javascript">JavaScript</option>
    <option value="python">Python</option>
    <option value="cpp">C++</option>
  </select>


<select
    className="select select-sm"
    value={editorTheme}
    onChange={(e) => setEditorTheme(e.target.value)}
  >
    <option value="vs-dark">Dark</option>
    <option value="light">Light</option>
    <option value="hc-black">High Contrast</option>
  </select>

  <div className="flex flex-col items-start gap-2 w-full max-w-sm">
  <label className="label">
    <span className="label-text text-sm">Font Size:</span>
    <span className="text-sm text-gray-500">{fontSize}px</span>
  </label>

  <input
    type="range"
    min="10"
    max="24"
    value={fontSize}
    onChange={(e) => setFontSize(parseInt(e.target.value))}
     className="w-full h-1 appearance-none bg-accent rounded-md [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-gray-400 [&::-webkit-slider-thumb]:shadow-md focus:outline-none"
  />
</div>
                </div>
                <div className="tooltip tooltip-bottom" data-tip="Reset Code">
                  <button className='btn btn-ghost' onClick={() => handleReset(selectedLanguage)}
                    ><RefreshCw/></button>
                  
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
                  theme={editorTheme}
                  options={{
                    fontSize: fontSize,
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
                    className={`btn btn-success btn-sm text-black font-semibold tracking-wide px-6 py-2 rounded-xl 
    bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 
    shadow-md hover:shadow-xl hover:shadow-blue-300 transition-all duration-300 ${loading ? 'loading' : ''}`}
                    onClick={handleRun}
                    disabled={loading}
                  > Run</button>
                  <button
  onClick={handleSubmitCode}
  disabled={loading || cooldown > 0}
  className={`btn btn-success btn-sm text-black font-semibold tracking-wide px-6 py-2 rounded-xl 
    bg-gradient-to-r from-green-300 via-green-400 to-green-500 
    shadow-md hover:shadow-xl hover:shadow-green-300 transition-all duration-300 ${
    cooldown > 0 ? 'opacity-50 cursor-not-allowed' : ''
  }`}
>
  {cooldown > 0 ? `Please wait ${cooldown}s` : 'Submit'}
</button>
                </div>
              </div>
            </div>
  )
}

export default CodeEditor