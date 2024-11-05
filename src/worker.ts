import { MyMessage } from "./message.js";

self.onmessage = messageEvent => new MyWorker().onMessage( messageEvent );

class MyWorker
{
	onMessage( messageEvent: MessageEvent<MyMessage> )
	{
		const number1 = messageEvent.data.number1;
		const number2 = messageEvent.data.number2;
		console.log( "Worker: Message received from main script with numbers: " +
			number1.toString() + ", " + number2.toString() );

		const result = number1 * number2;
		console.log( "Worker: Posting message back to main script: " + result.toString() );
		postMessage( result );
	}
}
