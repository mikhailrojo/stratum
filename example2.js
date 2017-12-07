пишу часть майнера для проверки правильности работы

private String generateCoinbase(String en2){
	StringBuilder coinbase = new StringBuilder();
	coinbase.append(coinb1);
	coinbase.append(Extranonce1);
	coinbase.append(en2);
	coinbase.append(coinb2);
	return coinbase.toString();
}

public String Merkle2(String cb) {
	String mr = cb;
	for(int i = 0; i < merkle_branch.length; ++i)
	mr = sha256(sha256(mr + merkle_branch));
	return mr;
}

public String reverse(String string) {
	int n = string.length() / 2;
	StringBuilder sb = new StringBuilder();
	for(int i = (n - 1) * 2; n >= 0; n-=2)
	sb.append(string.substring(i, i + 1));
	return sb.toString();
}

public String reverse8(String string) {
	StringBuilder sb = new StringBuilder();
	for(int i = 0; i < string.length(); i+=8){
		int end = Math.min(i + 7, string.length() - 1);
		sb.append(reverse(string.substring(i, end)));
	}
	return sb.toString();
}

public String testControll(String nonce2, String en2) {
	String coinbase = sha256(sha256(generateCoinbase(en2)));
	String merkle = Merkle2(coinbase);
	String header = version + prevhash + reverse8(merkle) + ntime +
		nbits + nonce2 + "000000800000000000000000000000000000000000000000000000000000000000000000000000000000000080020000";
	String hash = sha256(sha256(header));
	return hash;
}
Скрытое содержимое:
	**Скрытое содержимое: Для просмотра Вам необходимо минимум 1 сообщений на форуме.**
я запускаю это со следующими параметрами (которые я получаю от существующего минера)

{"id": 0, "method": "mining.subscribe", "params": ["cgminer/3.7.2"]}

{"id":0,"result":[[["mining.set_difficulty","b4b6693b72a50c7116db18d6497cac52"],["mining.notify","ae6812eb4cd7735a302a8a9dd95cf71f"]],"f53d0211",4],"error":null} {"id": 1, "method": "mining.authorize", "params": ["up101084139.cgminertest", "pass"]}

{"id":1,"result":true,"error":null}

{"id":null,"params":[4],"method":"mining.set_difficulty"}

{"id":null,"params":["-4fb1d548","db48fff805d2f2be98c101b2103afcd3fc0d2f2803bf92a30000000000000000","01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff410353950604f8b0e75708","2e522cfabe6d6d3555ed13d9e4c9317fc507a9080eeef9cb14b591b0cc1636caff691168d3f24704000000000000000000000001e5129d4a000000001976a91480ad90d403581fa3bf46086a91b2d9d4125db6c188ac00000000",["7c60191525d8563e379a4049e44d77be2fecdb348eaf844c86d434a0cad8d75c","ae757ce8f99307303fd31b81b1672674523e84cebab7d4f5fc76c97c46fe6f87","6ab95b94b7970237331551e2f22097432863ee31916d9c80fa2251739d6eb20d","332eec53c5f131c6abe85d64f928151d072cae47f8477d417185b84ec2904a56","3c2f9fdbcca3f01cc8ca2f8eee445271617f10889c39d5644399865fe6dc8a1d","b06350717cd3e844ed5d605a4d7a5f25bf859beeb2bf1aab4e2bf7fa45ee5954","7a1f44163fe18591b2c50b1499b8f09f519e9cd18d1fda14be0e87a029cda741"],"20000000","18048ed4","57e7b0f8",true],"method":"mining.notify"}

{"params": ["up101084139.cgminertest", "-4fb1d548", "01000000", "57e7b0f8", "2536d114"], "id": 2, "method": "mining.submit"}

и получить результат блока заголовка хеш: 60be74f0d211b35bc2d23b39cb3bc79667291b439639dc20f63616a35d89b14b, но она должна быть ниже, чем цель, но это не так

что я делаю не так?
	где моя ошибка?
	как сделать это правильно?
