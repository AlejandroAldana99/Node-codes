// Edit time Helper
import { DEFAULT_INTERVAL } from '~/Config/constants';

const addTime = (time) => {
  let times=time.split(":");
  let min=DEFAULT_INTERVAL%(24*60);

  times[0]=(parseInt(times[0]))+parseInt(min/60) ;
  times[1]=parseInt(times[1])+min%60;
  
  if(times[1]>=60) { times[1]=0 ;times[0]++} ;
  times[0]>=24 ?  times[0]-=24  :null;
  
  times[0]<10 ? times[0]= "0" + times[0] : null ;
  times[1]<10 ? times[1]= "0" + times[1] : null ;
  
  return times.join(":");
}

export default addTime;