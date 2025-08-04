import { Timer, Cpu,TestTubeDiagonal} from 'lucide-react';

function SubmitResult({submitResult})
{
  // console.log({submitResult})
    return(
        <div className="flex-1 p-4 overflow-y-auto">
              <h3 className="font-semibold mb-4">Submission Result</h3>
              {submitResult ? (
                <div className={`bg-transparent p-2 rounded-2xl  mb-4 w-[100%]`}>
                  <div>
                    {submitResult.accepted ? (
                      <div>
                        <h4 className="font-bold text-lg">🎉 Accepted</h4>
                        <div className="mt-4 space-y-2 bg-black text-white rounded-2xl p-3">
                          <p className='flex items-center gap-1'><TestTubeDiagonal className={`${submitResult.accepted ? 'text-green-400' : 'text-red-500'}`}/>Test Cases Passed: {submitResult.passedTestCases}/{submitResult.totalTestCases}</p>
                          <hr className={`${submitResult.accepted ? 'text-green-400' : 'text-red-500'}`}></hr>
                          <p className='flex items-center gap-1'><Timer/>Runtime: {submitResult.runtime + " sec"}</p>
                          <p className='flex items-center gap-1'><Cpu/>Memory: {submitResult.memory + "KB"} </p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h4 className="font-bold text-lg ">❌ Error while evalutating{submitResult.error}</h4>
                        <div className="mt-4 space-y-2 bg-black text-white rounded-2xl p-3">
                          <p className='flex items-center gap-1'><TestTubeDiagonal className={`${submitResult.accepted ? 'text-green-400' : 'text-red-500'}`}/>Test Cases Passed: {submitResult.passedTestCases}/{submitResult.totalTestCases}</p>
                          <hr className={`${submitResult.accepted ? 'text-green-400' : 'text-red-500'}`}></hr>
                          <p className='flex items-center gap-1'><Timer/>Runtime: {submitResult.runtime + " sec"}</p>
                          <p className='flex items-center gap-1'><Cpu/>Memory: {submitResult.memory + "KB"} </p>
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
    )
}
export default SubmitResult