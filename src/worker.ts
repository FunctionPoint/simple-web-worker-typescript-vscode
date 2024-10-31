self.onmessage = messageEvent => new MyWorker().onMessage( messageEvent );

// Cannot import here, must redefine the type
// import { MyMessage } from "./message.js";

type MyMessage =
{
	number1: number;
	number2: number;
}

class MyWorker
{
	onMessage( messageEvent: MessageEvent<MyMessage> )
	{
		console.log( "Worker: Message received from main script" );

		const result = messageEvent.data.number1 * messageEvent.data.number2;
		if( isNaN( result ) ) {
			postMessage( "Invalid input" );
		} else {
			console.log( "Worker: Posting message back to main script" );
			postMessage( result.toString() );
		}
	}
}
