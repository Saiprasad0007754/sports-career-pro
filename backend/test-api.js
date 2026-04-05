const profile = { name: "Ravi", sportInterest: "Cricket", age: 20, weightKg: 70, fitnessLevel: "Beginner", careerLevel: "State", priority: "passion" };
fetch("http://localhost:8080/api/guidance/analyze", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(profile)
}).then(res => res.text()).then(text => console.log("RESPONSE:", text)).catch(console.error);
