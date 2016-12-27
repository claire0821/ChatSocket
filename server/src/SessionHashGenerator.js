let instance = null; // instance of singleton

export default class SessionHashGenerator {

	constructor()
	{
		if (!instance) instance = this;

		this.lastHashTime = null;
		this.lastHashIncr = 0;

		return instance;
	}

	generateHash()
	{
		const time = Date.now();
		if (time === this.lastHashTime) {
			this.lastHashIncr += 1;
		} else {
			this.lastHashIncr = 0;
		}
		this.lastHashTime = time;
		const incr = this.lastHashIncr;
		const timeStr = time.toString(16);
		const incrStr = (incr<16) ? "0"+incr.toString(16) : incr.toString(16);
		return timeStr + "#" + incrStr;
	}
}