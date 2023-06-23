//const t="vk1.a.JBKZOHyyWOXA8iT5KfDJEwreMKId5G-HopQyfQ5KOgG4IY20T7_CwTKx4YF6d7U8PejajoWdy0gBFmAsSVafHaKGN34g8w1ytwxPQjTG5_QUxKSVQvC1iiddVE_fy46fOg0OGG35JhNekBfF6J9AZCqBYbOHft3BvSEUQm_PKrLQOvyife194rgNAnLPPlf4Wco4Nm0s8E08nBXszLfH3Q";
const t="vk1.a.vUVgnEPu-P8lcRDpF79PDqqi6QvNwEXhVxIw0KsqEWbYcntrppN3YiPgh78ESNiwkJKeb6tIaFE67eJl1iD6_umYv2USs0GeT5pVS5-DZUwIVQaDXkjWLA-eiS98C0i79QKLkX2GYqs8cN7zxR4yhRGVTwz7KGoyyDDAsxvnIa379q0eiHYTzIEmTSa3txnuBa5SMtdW2GzAqsdMt-KCdg";

const axios=require('axios').default;
var url="https://api.vk.com/method/users.get";
const user_id=98506638;
/*
 axios.get(`${url}?access_token=${t}&user_ids=${user_id}&v=5.131&fields=sex,contacts`).then(function(res){
	 console.log(res.data, res.data.error);
 }).catch(function(err){console.log(err);});

const access_token="y0_AgAAAABafYZTAAnbdQAAAADla-VqSDoI6A8tQHyR8VsLTSBmbOylkEI";
var burl="https://login.yandex.ru/info?format=json";
axios.get(burl, {
        headers: {
          Authorization: `OAuth ${access_token}`,
        },
      }).then(function(res){
		  console.log(res.data);
	  }).catch(function(err){
		  console.log(err);
	  });
	  */ 
/*
 vk: {
  id: 98506638,
   home_phone: '',
  sex: 2,
  first_name: 'Равкат',
  last_name: 'Замандухватуллин',
  can_access_closed: true,
  is_closed: false
}
yandex:
{  id: '1518175827',
  login: 'gafarovalik411',
  client_id: 'ef527d81bdfc456997913d1f686c288f',
  display_name: 'gafarovalik411',
  real_name: 'Алик Гафаров',
  first_name: 'Алик',
  last_name: 'Гафаров',
  sex: null,
  default_email: 'gafarovalik411@yandex.ru',
  emails: [ 'gafarovalik411@yandex.ru' ],
  birthday: '',
  default_avatar_id: '0/0-0',
  is_avatar_empty: true,
  default_phone: { id: 569740042, number: '+79634623542' },
  psuid: '1.AAnbdQ.5fe4QK4wKOk-ZBNez8O_1Q.5sDuI9FbKIa-DDCIbmGoRA'
}

 */ 
 
 
 var a4 = ["AU", "AD", "AR1", "GBq", "GB1"]
 var b = ["AR", "AU", "SU", "GB"]
 var dto = {sex:"male", busy:false, c: a4, id:1, suechsex: "female", bid: 1}
 var dto1 = { sex: "female", busy: false, c: b, id:2, suechsex: "male", bid: 2}
 let map = [
 {
	dto: dto 
 },
 {
	 dto:dto1
 }
 ]
 
 var suka = function(){
	 let a2;
	 if(dto.sex == dto.suechsex && dto1.sex == dto1.suechsex){
		 a2=true;
		 return true;
	 } else
	 //{a2=false;}
	 if(dto.sex !==dto.suechsex && dto1.sex !== dto1.suechsex ){
		 a=false;
		 return false;
	 }
	 return 3;
 }
 console.log('suka: ', suka());
 
 console.log('bi : ', bi(a4, b));
  function bi(ab, b){
	//  console.log("a", ab);
 let f1 = ab.some(function(el, i){
	// console.log(i);
	
	let f3=b.some(function(bi, d){
		//console.log(d, el ,'==' ,bi);
		return el == bi;
	});
	
	return f3;
 });
 return f1;
 //console.log(f1);
}
 var f = map.filter(function(p){
	// console.log('p.c', p.c);
	if(p.dto.suechsex=="female"){
	 return  !p.dto.busy && bi(p.dto.c, dto1.c) && !suka();//p.dto.id !==p.dto.bid;
 }else{
	 return !p.dto.busy && bi(p.dto.c, dto1.c) && suka();
 }
 });
 console.log('F', f);

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
