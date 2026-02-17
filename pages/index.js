import { useState } from "react";
import { supabase } from "../lib/supabase";
import { calculatePrice } from "../lib/calc";

export default function Home() {
  const [tab, setTab] = useState("notice");
  const [form, setForm] = useState({
    face: "", ban: "", login_ok: "", server: "", rank: "", kd: "",
    level: 60, haf: 40, asset: 40,
    insurance: 9, exp_days: 9, stamina: 6, weight: 6,
    armor6:0, helmet6:0, repair_red:0, aw:0,
    knives:[], bricks:[], red_skins:"", forbidden:"",
    dream:"", contact_time:"", phone:""
  });
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    if(form.face !== "yes"){ alert("非本人实名不收"); return; }
    if(form.ban === "yes"){ alert("近三月有封禁记录不收"); return; }

    const res = calculatePrice(form);
    setResult(res);
  }

  const handleSubmit = async () => {
    // 简化版序号生成 yMMDD0001（可改成自增）
    const today = new Date();
    const m = today.getMonth()+1;
    const d = today.getDate();
    const serial = `y${m}${d < 10 ? "0"+d : d}0001`;

    const { error } = await supabase.from('orders').insert([{
      ...form,
      serial,
      created_at: new Date().toISOString(),
      ratio: result.ratio,
      price: result.price
    }]);

    if(error) alert("提交失败:"+error.message);
    else alert("提交成功，序号："+serial);
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">逆行电竞哈弗币回收平台</h1>
      <div className="flex gap-4 mb-6">
        <button onClick={()=>setTab("notice")} className="px-4 py-2 bg-gray-200 rounded">出租须知</button>
        <button onClick={()=>setTab("form")} className="px-4 py-2 bg-gray-200 rounded">获取报价</button>
      </div>

      {tab==="notice" && (
        <div className="space-y-2 text-sm leading-6">
          <h2 className="font-semibold">出租流程：</h2>
          <p>1. 填表获取报价</p>
          <p>2. 上架账号匹配打手</p>
          <p>3. 扫码上号/人脸验证</p>
          <p>4. 验号与补偿沟通</p>
          <p>5. 提供收款码结算</p>
          <h2 className="font-semibold">账号要求：</h2>
          <p>40m起收，80m以上需6体6负重</p>
          <h2 className="font-semibold">封号说明：</h2>
          <p>短封计入租期，十年封按1.5倍赔付</p>
        </div>
      )}

      {tab==="form" && (
        <div className="space-y-2">
          <label>是否本人实名：
            <select value={form.face} onChange={e=>setForm({...form, face:e.target.value})}>
              <option value="">请选择</option>
              <option value="yes">是</option>
              <option value="no">否</option>
            </select>
          </label>

          <label>近三月封禁：
            <select value={form.ban} onChange={e=>setForm({...form, ban:e.target.value})}>
              <option value="">请选择</option>
              <option value="no">无</option>
              <option value="yes">有</option>
            </select>
          </label>

          <label>可否账密登录：
            <select value={form.login_ok} onChange={e=>setForm({...form, login_ok:e.target.value})}>
              <option value="">请选择</option>
              <option value="yes">可以</option>
              <option value="no">不可以</option>
            </select>
          </label>

          <label>区服：
            <select value={form.server} onChange={e=>setForm({...form, server:e.target.value})}>
              <option value="">请选择</option>
              <option value="QQ">QQ</option>
              <option value="VX">VX</option>
            </select>
          </label>

          <label>段位：
            <select value={form.rank} onChange={e=>setForm({...form, rank:e.target.value})}>
              <option value="">请选择</option>
              <option value="巅峰">巅峰</option>
              <option value="黑鹰">黑鹰</option>
              <option value="钻石">钻石</option>
              <option value="铂金">铂金</option>
              <option value="黄金">黄金</option>
              <option value="白银">白银</option>
              <option value="青铜">青铜</option>
              <option value="无">无</option>
            </select>
          </label>

          <label>绝密KD：
            <input type="number" value={form.kd} onChange={e=>setForm({...form, kd:e.target.value})}/>
          </label>

          <label>游戏等级：
            <input type="number" value={form.level} onChange={e=>setForm({...form, level:Number(e.target.value)})}/>
          </label>

          <label>哈弗数量：
            <input type="number" value={form.haf} onChange={e=>setForm({...form, haf:Number(e.target.value)})}/>
          </label>

          <label>总资产：
            <input type="number" value={form.asset} onChange={e=>setForm({...form, asset:Number(e.target.value)})}/>
          </label>

          <label>不能动的有：
            <input type="text" value={form.forbidden} onChange={e=>setForm({...form, forbidden:e.target.value})}/>
          </label>

          <label>圆梦挑战：
            <select value={form.dream} onChange={e=>setForm({...form, dream:e.target.value})}>
              <option value="">请选择</option>
              <option value="油">油</option>
              <option value="锅">锅</option>
              <option value="浮力设备">浮力设备</option>
              <option value="勇者之证">勇者之证</option>
              <option value="暗星燃料">暗星燃料</option>
            </select>
          </label>

          <label>保险格数：
            <select value={form.insurance} onChange={e=>setForm({...form, insurance:Number(e.target.value)})}>
              <option value={4}>4</option>
              <option value={6}>6</option>
              <option value={9}>9</option>
            </select>
          </label>

          <label>9格体验卡：
            <input type="number" value={form.exp_days} onChange={e=>setForm({...form, exp_days:Number(e.target.value)})}/>
          </label>

          <label>体力等级：
            <input type="number" value={form.stamina} onChange={e=>setForm({...form, stamina:Number(e.target.value)})}/>
          </label>

          <label>负重等级：
            <input type="number" value={form.weight} onChange={e=>setForm({...form, weight:Number(e.target.value)})}/>
          </label>

          <label>满耐久六甲：
            <input type="number" value={form.armor6} onChange={e=>setForm({...form, armor6:Number(e.target.value)})}/>
          </label>

          <label>满耐久六头：
            <input type="number" value={form.helmet6} onChange={e=>setForm({...form, helmet6:Number(e.target.value)})}/>
          </label>

          <label>满耐久红修：
            <input type="number" value={form.repair_red} onChange={e=>setForm({...form, repair_red:Number(e.target.value)})}/>
          </label>

          <label>AW数量：
            <input type="number" value={form.aw} onChange={e=>setForm({...form, aw:Number(e.target.value)})}/>
          </label>

          <label>刀皮：
            <input type="text" value={form.knives} onChange={e=>setForm({...form, knives:e.target.value.split(",")})} placeholder="赤霄,怜悯"/>
          </label>

          <label>砖皮：
            <input type="text" value={form.bricks} onChange={e=>setForm({...form, bricks:e.target.value.split(",")})} placeholder="M7,MP7"/>
          </label>

          <label>红皮：
            <input type="text" value={form.red_skins} onChange={e=>setForm({...form, red_skins:e.target.value})}/>
          </label>

          <label>联系方式：
            <input type="text" value={form.contact_time} onChange={e=>setForm({...form, contact_time:e.target.value})} placeholder="0-24点"/>
          </label>

          <label>手机号码：
            <input type="text" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})}/>
          </label>

          <button onClick={handleCalculate} className="px-4 py-2 bg-blue-500 text-white rounded">计算报价</button>

          {result && (
            <div>
              <p>比例: {result.ratio.toFixed(2)}</p>
              <p>报价: {result.price} 元</p>
              <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded mt-2">提交订单</button>
            </div>
          )}
        </div>
      )}

      <div className="mt-10 text-center text-xs text-gray-500">
        <p>@2026 逆行电竞俱乐部（杭州逆行数字传媒科技有限公司）</p>
        <p>线下工作室 高效靠谱 售后完善</p>
      </div>
    </div>
  )
}

