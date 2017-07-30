function replaceStr (param1, param2, param3) {
		originStr = param1.toString();
		
        // 정규식 예약어 예외 처리
        originStr = originStr
        .replace(/\\/g, "\\\\")
        .replace(/\[/g, "\\[")
        .replace(/\]/g, "\\]")
        .replace(/\+/g, "\\+")
        .replace(/\*/g, "\\*")
        .replace(/\^/g, "\\^")
        .replace(/\|/g, "\\|")
        .replace(/\?/g, "\\?")
        .replace(/\./g, "\\.")
        .replace(/\(/g, "\\(")
        .replace(/\)/g, "\\)");

		return originStr.replace(new RegExp(param2,"g"), param3);
}