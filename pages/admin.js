import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Admin(){
  const [orders,setOrders] = useState([]);
  const [selected,setSelected] = useState([]);

  useEffect(()=>{ fetchOrders() },[]);

  const fetchOrders = async ()=>{
    const { data, error } = await supabase.from('orders').select('*').order('created_at',{ascending:true});
    if(error) console.log(error);
    else setOrders(data);
  }

  const toggleSelect = (id)=>{
    setSelected(prev => prev.includes(id)? prev.filter(x=>x!==id):[...prev,id]);
  }

  const copySelected = ()=>{
    const rows = orders.filter(o=>selected.includes(o.id));
    const text = rows.map(r=>[
      r.serial, r.dream, r.server, r.rank, r.kd, r.level, r.haf, r.asset, 
      r.insurance, r.exp_days, r.stamina, r.weight, r.armor6, r.helmet6,
      r.repair_red, r.aw, `${r.knives}|${r.bricks}|${r.red_skins}`,
      r.login_ok, r.contact_time, r.phone, r.price, ""
    ].join("\t")).join("\n");

    navigator.clipboard.writeText(text);
    alert("已复制到剪贴板，可粘贴到Excel");
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">后台管理</h1>
      <button onClick={copySelected} className="px-4 py-2 bg-blue-500 text-white rounded mb-4">复制选中</button>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th></th><th>序号</th><th>圆梦挑战</th><th>区服</th><th>段位</th><th>KD</th>
            <th>等级</th><th>哈弗</th><th>资产</th><th>保险</th><th>体验卡</th>
            <th>体力</th><th>负重</th><th>六甲</th><th>六头</th><th>红修</th>
            <th>AW</th><th>皮肤</th><th>账密</th><th>联系时间</th><th>电话</th><th>报价</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o=>(
            <tr key={o.id} className="border">
              <td><input type="checkbox" checked={selected.includes(o.id)} onChange={()=>toggleSelect(o.id)}/></td>
              <td>{o.serial}</td><td>{o.dream}</td><td>{o.server}</td><td>{o.rank}</td><td>{o.kd}</td>
              <td>{o.level}</td><td>{o.haf}</td><td>{o.asset}</td><td>{o.insurance}</td><td>{o.exp_days}</td>
              <td>{o.stamina}</td><td>{o.weight}</td><td>{o.armor6}</td><td>{o.helmet6}</td><td>{o.repair_red}</td>
              <td>{o.aw}</td><td>{o.knives}|{o.bricks}|{o.red_skins}</td><td>{o.login_ok}</td>
              <td>{o.contact_time}</td><td>{o.phone}</td><td>{o.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
