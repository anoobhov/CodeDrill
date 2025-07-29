import {Terminal,Timer, Cpu,BookCheck} from 'lucide-react';


function RunResult({runResult})
{
    return(
        <div className="flex-1 p-4 overflow-y-auto">
              <h3 className="font-semibold mb-4">Test Results</h3>
              {runResult ? (
                <div className={`bg-gradient-to-b from-gray-400 to-black p-2 rounded-2xl  mb-4 w-[100%]`}>
                  <div>
                    {runResult.success ? (
                      <div>
                        <h4 className="font-bold flex items-center gap-1 text-black"><BookCheck /> All test cases passed!</h4>
                        <p className="text-sm mt-2 flex items-center gap-1 text-black"><Timer/> Runtime: {runResult.runtime+" sec"}</p>
                        <p className="text-sm flex items-center gap-1 text-black"><Cpu/> Memory: {runResult.memory+" KB"}</p>
                        
                        <div className="mt-4 space-y-2">
                          {runResult.testCases.map((tc, i) => (
                            <div key={i} className="bg-black p-5 rounded text-s w-142">
                              <div className="font-mono">
                                <div className='inline font-bold'><strong><Terminal className={`inline ${runResult.success ? 'text-green-400' : 'text-red-500'}`}/>TestCase:</strong> {i+1}</div>
                                <hr className={`${runResult.success ? 'text-green-400' : 'text-red-500'}`}></hr>
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
                                <div className='inline'><strong><Terminal className={`inline ${runResult.success ? 'text-green-400' : 'text-red-500'}`}/>TestCase:</strong> {i+1}</div>
                                <hr className={`${runResult.success ? 'text-green-400' : 'text-red-500'}`}></hr>
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
                </div>
                )}
            </div>
    )
}
export default RunResult