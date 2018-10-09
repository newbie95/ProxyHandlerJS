var scope = {};
function RGProxy(object,handler){
	var elements = document.querySelectorAll('[rg-bind]');
		for(element of elements){
			var key = element.getAttribute("rg-bind");
			if(!object.elements){
				object.elements = [element];
			}
			else{
				object.elements.push(element);
			}
		}
	return new Proxy(object,handler);
}
var handler = {
	get: function (target, name) {
		return name in target ? target[name] : "";
	},
	set: function (target,name,value) {
		target[name] = value;
		for(var element of target.elements){
			element.innerHTML = value;
		}
	},
};


scope.p = new RGProxy({}, handler);


var value = 0;
setInterval(function () {
	scope.p.value = value++;
},3000);
