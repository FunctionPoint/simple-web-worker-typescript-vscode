import { MyMessage } from "./MyMessage.js";

export class MyWorker
{
	start()
	{
		self.onmessage = messageEvent => this.onMessage( messageEvent );
	}

	onMessage( messageEvent: MessageEvent<MyMessage> )
	{
		const number1 = messageEvent.data.number1;
		const number2 = messageEvent.data.number2;
		console.log( "MyWorker: Message received from main script with numbers: " +
			number1.toString() + ", " + number2.toString() );

		const result = number1 * number2;
		console.log( "MyWorker: Posting message back to main script: " + result.toString() );
		postMessage( result );
	}
}
