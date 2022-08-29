// Adding handler constant to exports global var
// telling serverless how to deal with incoming request
// by telling how to handle handler

exports.handler = async () =>{
    return{
        statusCode: 200,
        body: 'Hello!'
    }
}