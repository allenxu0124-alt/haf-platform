export function calculatePrice(data) {
  let haf = data.haf;
  let insurance = data.insurance;
  let days = Math.ceil(haf / 10);

  if (insurance !== 9 && data.exp_days >= days) insurance = 9;

  let rangeIndex = Math.floor(haf / 100);

  let base =
    insurance === 9
      ? 0.39 + rangeIndex * 0.01
      : insurance === 6
      ? 0.41 + rangeIndex * 0.01
      : 0.44 + rangeIndex * 0.01;

  // 刀皮逻辑
  let knifeBonus = 0;
  if (data.knives.includes("赤霄") || data.knives.includes("怜悯")) knifeBonus = 0.02;
  else if (data.knives.length > 0) knifeBonus = 0.01;
  if (data.knives.length >= 3) knifeBonus += 0.01;
  knifeBonus = Math.min(knifeBonus, 0.03);
  base -= knifeBonus;

  // 砖皮逻辑
  if (data.bricks.length > 0) base -= 0.01;

  // 体力负重不足
  if (haf >= 80 && (data.stamina < 6 || data.weight < 6)) base += 0.02;

  // 附加品
  let extra =
    data.armor6 * 2 +
    data.helmet6 * 2 +
    data.repair_red * 1 +
    data.aw * 0.5;

  let price = Math.round(haf / base + extra);

  return { ratio: base, price, days };
}
