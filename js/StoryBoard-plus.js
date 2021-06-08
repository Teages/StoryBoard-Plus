

export function sbplusCompile(chartInput, sbplusInput) {
    /* Chart preloader*/
    // load input objects
    chart = (typeof (chartInput) === "object" ? deepcopy(chartInput) : JSON.parse(chartInput));
    sbplus = (typeof (sbplusInput) === "object" ? deepcopy(sbplusInput) : JSON.parse(sbplusInput));
    // tick to time pre load
    for (tempo_p in orginalChart.tempo_list) {
        if (tempo_p == 0) {
            orginalChart.tempo_list[tempo_p].time = 0
        } else {
            orginalChart.tempo_list[tempo_p].time =
                orginalChart.tempo_list[tempo_p - 1].time +
                (orginalChart.tempo_list[tempo_p].tick - orginalChart.tempo_list[tempo_p - 1].tick) *
                (orginalChart.tempo_list[tempo_p - 1].value / 1000000 / orginalChart.time_base)
        }
    }

    /* Functions */
    // Tick as time
    tickAsTime(sbplus);
    // State Inheritance
    // stateInheritance();
    // Multi-state
    // multiState();

    function tickAsTime(obj) {
        for (let i in obj) {
            if (typeof(obj[i]) === "string") {
                let type = obj[i].split(":")[0];
                let value = Number(obj[i].split(":")[1]);
                let offset = (obj[i].split(":")[2] ? Number(obj[i].split(":")[2]) : 0);
                let time = 0;
                if (type === "tick") {
                    time = tickToTime(value) + offset;
                    obj[i] = time;
                }
            } else if (typeof(obj[i]) === "object") {
                tickAsTime(obj[i]);
            }
        }
        return obj;
    }
    function tickToTime(tick) {
        let tempo = 0, time = 0, relativeTick = 0
        for (tempo_p in orginalChart.tempo_list) {
            if (tick < orginalChart.tempo_list[tempo_p].tick) {
                break
            }
            else {
                tempo = orginalChart.tempo_list[tempo_p].value
                time = orginalChart.tempo_list[tempo_p].time
                relativeTick = tick - orginalChart.tempo_list[tempo_p].tick
            }
        }
        return time + relativeTick * tempo / 1000000 / orginalChart.time_base
    }
    function getEasingState(easing = "linear", percent = 0) {
        let ans = 0;
        let x = percent;
        let cos = Math.cos;
        let sin = Math.sin;
        let pow = Math.pow;
        const c1 = 1.70158;
        const c2 = c1 * 1.525;
        const c3 = c1 + 1;
        const c4 = (2 * Math.PI) / 3;
        const c5 = (2 * Math.PI) / 4.5;
        const n1 = 7.5625;
        const d1 = 2.75;
        
        switch (easing) {
            case "linear":
                ans = x;
                break;
                
            case "easeInSine":
                ans = 1 - cos((x * PI) / 2);
                break;
            case "easeOutSine":
                ans = sin((x * PI) / 2);
                break;
            case "easeInOutSine":
                ans = -(cos(PI * x) - 1) / 2;
                break;

            case "easeInQuad":
                ans = x * x;
                break;
            case "easeOutQuad":
                ans = 1 - (1 - x) * (1 - x);
                break;
            case "easeInOutQuad":
                ans = x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2;
                break;

            case "easeInCubic":
                ans = x * x * x;
                break;
            case "easeOutCubic":
                ans = 1 - pow(1 - x, 3);
                break;
            case "easeInOutCubic":
                ans = x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2;
                break;

            case "easeInQuart":
                ans = x * x * x * x;
                break;
            case "easeOutQuart":
                ans = 1 - pow(1 - x, 4);
                break;
            case "easeInOutQuart":
                ans = x < 0.5 ? 8 * x * x * x * x : 1 - pow(-2 * x + 2, 4) / 2;
                break;

            case "easeInQuint":
                ans = x * x * x * x * x;
                break;
            case "easeOutQuint":
                ans = 1 - pow(1 - x, 5);
                break;
            case "easeInOutQuint":
                ans = x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2;
                break;

            case "easeInExpo":
                ans = x === 0 ? 0 : pow(2, 10 * x - 10);
                break;
            case "easeOutExpo":
                ans = x === 1 ? 1 : 1 - pow(2, -10 * x);
                break;
            case "easeInOutExpo":
                ans = x === 0
                ? 0
                : x === 1
                ? 1
                : x < 0.5 ? pow(2, 20 * x - 10) / 2
                : (2 - pow(2, -20 * x + 10)) / 2;
                break;

            case "easeInCirc":
                ans = 1 - sqrt(1 - pow(x, 2));
                break;
            case "easeOutCirc":
                ans = sqrt(1 - pow(x - 1, 2));
                break;
            case "easeInOutCirc":
                ans = x < 0.5
                ? (1 - sqrt(1 - pow(2 * x, 2))) / 2
                : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2;
                break;

            case "easeInBack":
                ans = c3 * x * x * x - c1 * x * x;
                break;
            case "easeOutBack":
                ans = 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
                break;
            case "easeInOutBack":
                ans = x < 0.5
                ? (pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
                : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
                break;

            case "easeInElastic":
                ans = x === 0
                ? 0
                : x === 1
                ? 1
                : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
                break;
            case "easeOutElastic":
                ans = x === 0
                ? 0
                : x === 1
                ? 1
                : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
                break;
            case "easeInOutElastic":
                ans = x === 0
                ? 0
                : x === 1
                ? 1
                : x < 0.5
                ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2
                : (pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5)) / 2 + 1;
                break;

            case "easeInBounce":
                ans = 1 - getEasingState("easeOutBounce", 1 - x);
                break;
            case "easeOutBounce":
                ans = function(){
                    if (x < 1 / d1) {
                        return n1 * x * x;
                    } else if (x < 2 / d1) {
                        return n1 * (x -= 1.5 / d1) * x + 0.75;
                    } else if (x < 2.5 / d1) {
                        return n1 * (x -= 2.25 / d1) * x + 0.9375;
                    } else {
                        return n1 * (x -= 2.625 / d1) * x + 0.984375;
                    }
                }
                break;
            case "easeInOutBounce":
                ans = x < 0.5
                ? (1 - getEasingState("easeOutBounce", 1 - 2 * x)) / 2
                : (1 + getEasingState("easeOutBounce", 2 * x - 1)) / 2;
                break;

            default:
                console.warn("Error: Unknown easing");
                break;
        }
    }
    // function randomID(length = 8) { // not used for now
    //     let keymap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    //     let ans = "";
    //     for (let i = 0; i < length; i++) ans += keymap.charAt(Math.floor(Math.random() * keymap.length));
    //     return ans;
    // }
    function deepcopy(obj) {
        return JSON.parse(JSON.stringify(obj))
    }
}