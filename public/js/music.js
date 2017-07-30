(function() {

	// 음원 20개
	var musicItems = [];
	musicItems.nameMap = {};
	function MusicItem(mi) {
		this.title = mi.title;
		this.time = mi.time;
		musicItems.nameMap[this.title] = true;
	};
	MusicItem.prototype.getTitle = function() {
		return this.title;
	}
	MusicItem.prototype.getTime = function() {
		return this.time;
	}
	MusicItem.prototype.getInfo = function() {
		return {title : this.title, time : this.time};
	}

	// 음원 20개 생성
	var createMusicItems = function() {
		var cnt, rv, mi;
		for(cnt = 20; cnt; ) {
			rv = parseInt(Math.random() * 99, 10);
			mi = data[rv];
			if(musicItems.nameMap.hasOwnProperty(mi.title))
				continue;
			musicItems.push(new MusicItem(mi));
			cnt--;
		}
	}();



	// 목록 생성자 (음원, 재생)
	function MusicList(items) {
		this.items = items;
		this.title = '음원목록';
	}
	MusicList.prototype.addTrs = function(ml) {
		var trs = '', self = this;
		ml.forEach(function(item, index) {
			trs += self.addTr(item);
		});
		return trs;
	}
	MusicList.prototype.addTd = function(value) {
		return '<td>' + value + '</td>';
	}



	// 음원 목록
	function SoundList(items) {
		var that;

		that = this;
		this.table = document.getElementById('music_item_table');
		this.createPlayList = document.getElementById('create_play_list');
		this.deleteMusicItem = document.getElementById('delete_music_item');

		MusicList.apply(this, arguments);

		this.table.tBodies[0].innerHTML = this.addTrs(this.items);

		this.getCheckedIndex = function() {
			var checkedArr = [];
			Array.prototype.forEach.call(that.table.rows, function(data, index){
				if(data.cells[0].children[0].checked)
					checkedArr.push(index);
			});
			return checkedArr;
		};

		this.eventBind = function() {

			// 음원목록 더블클릭
			_eventListener_(that.table, 'dblclick', function(e) {
				console.log(111);
			});

			// 재생목록 생성 클릭
			_eventListener_(that.createPlayList, 'click', function(e) {

				var checkedArr = that.getCheckedIndex();

			});

			// 삭제 클릭
			_eventListener_(that.deleteMusicItem, 'click', function(e) {

				var checkedArr = that.getCheckedIndex();

			});

		}();

	}
	SoundList.prototype = Object.create(MusicList.prototype);
	SoundList.prototype.constructor = SoundList;
	SoundList.prototype.addTr = function(item) {
		var tds = '', that = this;
		tds += that.addCheckboxInTd();
		tds += that.addTd(item.title);
		tds += that.addTd(_timeConversion_(item.time));
		return '<tr>' + tds + '</tr>';
	}
	SoundList.prototype.addCheckboxInTd = function() {
		return '<td><input type=checkbox /></td>';
	}



	// 재생 목록
	function PlayList(items) {
		MusicList.apply(this, arguments);
	}
	PlayList.prototype = Object.create(MusicList.prototype);
	PlayList.prototype.constructor = PlayList;
	PlayList.prototype.addTr = function(item) {
		var tds = '', that = this;
		tds += that.addDeleteInTd();
		tds += that.addTd(item.title);
		tds += that.addTd(_timeConversion_(item.time));
		return '<tr>' + tds + '</tr>';
	}
	PlayList.prototype.addDeleteInTd = function() {
		return '<td><input type=checkbox /></td>';
	}





	var musicLists = [];
	musicLists.playIndex = 0;
	musicLists.push(new SoundList(Array.prototype.slice.call(musicItems, 0)));



	function _timeConversion_(getTime) {
		if(getTime === "") return getTime;

		var minute = parseInt(getTime / 60),
			second = getTime % 60,
			resultStr;

		minute = minute < 1 ? '00' : (minute < 10 ? '0' + minute : '' + minute);
		second = second < 10 ? '0' + second : "" + second;
		resultStr = minute + ' : ' + second

		return resultStr;
	}

	function _eventListener_(element, eName, handler)
	{
		if(element.addEventListener)
			element.addEventListener(eName, handler, false);
		else if(element.attachEvent)
			element.attachEvent("on" + eName, handler);
		else
			element["on" + eName] = handler;
	}

	debugger;

})();
