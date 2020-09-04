/* 変数 */
var tag;//武器判別タグ
var critical;//会心率
var attack;//攻撃力
var slot;//スロット
var element;//属性値
var deffence;//防御力ボーナス
var skilInfo = [];
var sharp = [];//切れ味のデータ
var sharpLevel = [];//切れ味の強化レベルデータ
var series;//シリーズスキル情報
var keisu;//武器係数
var unique;//武器ごとの特殊なスキルの有無

/* 共通スクリプト */
function CalSkil(keisu, tag) {//スキル計算
    var deltaAtk = 0;//基礎攻撃力の上昇値の総和
    if (tag == 1 || tag == 5) {//大剣かハンマー
        var bairitu = [14, 9];//基礎攻撃力の上昇値
    } else {//それ以外
        var bairitu = [15, 10];
    }
    switch (skilInfo[0]) {//スキル１
        case "atk":
            deltaAtk += bairitu[0];
            break;
        case "crt":
            critical += 15;
            break;
        case "elm":
            CalElement(tag, 0);
            break;
        case "sharp":
            sharpLevel.push(6);
            break;
        case "def":
            deffence += 60;
            break;
        case "slot":
            slot.push(4);
            break;
        default:
            unique += 2;
            break;
    }
    for (let i = 1; i < skilInfo.length; i++) {//スキル２以下
        switch (skilInfo[i]) {
            case "atk":
                deltaAtk += bairitu[1];
                break;
            case "crt":
                critical += 10;
                break;
            case "elm":
                CalElement(tag, 1);
                break;
            case "sharp":
                sharpLevel.push(5);
                break;
            case "def":
                deffence += 50;
                break;
            case "slot":
                slot.push(3);
                break;
            case "series":
                series = "あり";
                break;
            default:
                unique += 1;
                break;
        }
    }
    attack += Math.round(keisu * deltaAtk);
}
function CalElement(tag, i) {//属性値計算。属性VIならi=0,Vならi=1
    var elemAdder = [];//属性値配列。要素が[属性VI,属性V,状態異常VI,状態異常V]
    switch (tag) {
        case 1://大剣
            elemAdder.push(150, 120, 70, 50);
            break;
        case 2://太刀
            elemAdder.push(120, 90, 50, 30);
            break;
        case 3://片手剣
            elemAdder.push(100, 70, 50, 30);
            break;
        case 4://双剣
            elemAdder.push(90, 60, 40, 20);
            break;
        case 5://ハンマー
            elemAdder.push(150, 120, 70, 50);
            break;
        case 6://狩猟笛
            elemAdder.push(150, 100, 90, 60);
            break;
        case 7://ランス
            elemAdder.push(120, 90, 90, 60);
            break;
        case 8://ガンランス
            elemAdder.push(150, 100, 90, 60);
            break;
        case 9://スラアク
            elemAdder.push(120, 90, 70, 50);
            break;
        case 10://チャアク
            elemAdder.push(90, 60, 70, 50);
            break;
        case 11://操虫棍
            elemAdder.push(100, 70, 50, 30);
            break;
        case 14://弓
            elemAdder.push(100, 70, 50, 30);
            break;
        default: break;
    }
    if (sim.weapon.value == 1) {//属性が火水雷氷龍
        element += elemAdder[i];
    } else {//属性が睡眠麻痺毒爆破
        element += elemAdder[i + 2];
    }
}
function CalSharpness() {//切れ味計算
    if (sharpLevel[0] == 6) {
        switch (sharpLevel.length) {
            case 1://切れ味6
                sharp = [12, 20, 20, 20, 24, 44, 0, 20];
                break;
            case 2://切れ味65
                sharp = [4, 8, 20, 20, 24, 48, 16, 20];
                break;
            case 3://切れ味655
                sharp = [4, 4, 4, 20, 24, 48, 36, 20];
                break;
            case 4://切れ味6555
                sharp = [4, 4, 4, 4, 20, 48, 56, 20];
                break;
            case 5://切れ味65555
                sharp = [4, 4, 4, 4, 4, 44, 76, 20];
                break;
            default: ;
        }
    } else if (sharpLevel[0] == 5) {
        switch (sharpLevel.length) {
            case 1://切れ味5
                sharp = [20, 20, 20, 20, 24, 36, 0, 20];
                break;
            case 2://切れ味55
                sharp = [4, 16, 20, 20, 24, 48, 8, 20];
                break;
            case 3://切れ味555
                sharp = [4, 4, 12, 20, 24, 48, 28, 20];
                break;
            case 4://切れ味5555
                sharp = [4, 4, 4, 8, 24, 48, 48, 20];
                break;
            default: ;
        }
    }
}
function Reset(t, a, k) {//共通ステータスのリセット。(tag, attack, keisu)
    tag = t;//武器判別タグ
    attack = a;//攻撃
    critical = 5;//会心
    slot = [4];//スロット
    deffence = 0;//防御力ボーナス
    skilInfo = [sim.skil_1.value, sim.skil_2.value,
    sim.skil_3.value, sim.skil_4.value, sim.skil_5.value];
    sharp = [40, 20, 20, 20, 24, 16, 0, 20];//切れ味のデータ
    sharpLevel = [];//切れ味の強化レベルデータ
    series = "なし";//シリーズスキル情報
    keisu = k;//武器係数
    element = 0;//いらない？
    unique = 0;//武器ごとの特殊スキル
}
function OutputCommon() {//攻撃、会心、スロット、シリーズを出力
    document.getElementById("atkResult").innerHTML = attack;
    document.getElementById("crtResult").innerHTML = critical;
    document.getElementById("slotResult").innerHTML = slot;
    document.getElementById("seriesResult").innerHTML = series;
}
function OutputSharp() {//切れ味出力
    document.getElementById('s0').style.width = `${sharp[0]}px`;
    document.getElementById('s1').style.width = `${sharp[1]}px`;
    document.getElementById('s2').style.width = `${sharp[2]}px`;
    document.getElementById('s3').style.width = `${sharp[3]}px`;
    document.getElementById('s4').style.width = `${sharp[4]}px`;
    document.getElementById('s5').style.width = `${sharp[5]}px`;
    document.getElementById('s6').style.width = `${sharp[6]}px`;
    document.getElementById('s7').style.width = `${sharp[7]}px`;
}
function OutputElement() {//属性値出力
    document.getElementById("elmResult").innerHTML = element;
}

/* HTMLからの呼び出し */
function Start01() {//大剣
    //リセット
    Reset(1, 1296, 4.8);//(tag, attack, keisu)
    switch (sim.weapon.value) {//属性値
        case "1":
            element = 150;
            break;
        case "2":
            element = 180;
            break;
        case "3":
            element = 300;
            break;
        default: break;
    }
    //計算
    CalSkil(keisu, tag);
    CalSharpness();
    //出力
    OutputCommon();
    OutputSharp();
    OutputElement();
}
function Start02() {//太刀
    //リセット
    Reset(2, 891, 3.3);//(tag, attack, keisu)
    switch (sim.weapon.value) {//属性値
        case "1":
            element = 180;
            break;
        case "2":
            element = 120;
            break;
        case "3":
            element = 210;
            break;
        default: break;
    }
    //計算
    CalSkil(keisu, tag);
    CalSharpness();
    //出力
    OutputCommon();
    OutputSharp();
    OutputElement();
}
function Start03() {//片手剣
    //リセット
    Reset(3, 378, 1.4);//(tag, attack, keisu)
    switch (sim.weapon.value) {//属性値
        case "1":
            element = 150;
            break;
        case "2":
            element = 90;
            break;
        case "3":
            element = 180;
            break;
        default: break;
    }
    //計算
    CalSkil(keisu, tag);
    CalSharpness();
    //出力
    OutputCommon();
    OutputSharp();
    OutputElement();
}
function Start04() {//双剣
    //リセット
    Reset(4, 378, 1.4);//(tag, attack, keisu)
    switch (sim.weapon.value) {//属性値
        case "1":
            element = 120;
            break;
        case "2":
            element = 90;
            break;
        case "3":
            element = 150;
            break;
        default: break;
    }
    //計算
    CalSkil(keisu, tag);
    CalSharpness();
    //出力
    OutputCommon();
    OutputSharp();
    OutputElement();
}
function Start05() {//ハンマー
    //リセット
    Reset(5, 1404, 5.2);//(tag, attack, keisu)
    switch (sim.weapon.value) {//属性値
        case "1":
            element = 180;
            break;
        case "2":
            element = 180;
            break;
        case "3":
            element = 210;
            break;
        default: break;
    }
    //計算
    CalSkil(keisu, tag);
    CalSharpness();
    //出力
    OutputCommon();
    OutputSharp();
    OutputElement();
}
function Start06() {//狩猟笛
    const neiroData = {//紫は共通している音色のため除外
        n0: ["#00ffff", "#ffa500"],//状態異常。紫空橙
        n1: ["#3cb371", "#ffa500"],//聴覚保護。紫緑橙
        n2: ["#ff0000", "#00ffff"],//攻撃I。紫赤空
        n3: ["#ff0000", "#3cb371"],//攻撃II。紫赤緑
        n4: ["#ff0000", "#0000ff"],//攻撃III。紫赤青
        n5: ["#ff0000", "#ffa500"],//攻撃IV。紫赤橙
        n6: ["#ff0000", "#ffd700"],//属性I。紫赤黄
        n7: ["#00ffff", "#ffd700"],//属性II。紫空黄
        n8: ["#3cb371", "#ffd700"],//属性III。紫緑黄
        n9: ["#ffd700", "#ffa500"],//属性IV。紫黄橙
        n10: ["#0000ff", "#3cb371"],//スタミナI。紫青緑
        n11: ["#0000ff", "#00ffff"],//スタミナII。紫青空
        n12: ["#0000ff", "#ffd700"],//スタミナIII。紫青黄
        n13: ["#0000ff", "#ffa500"],//スタミナIV。紫青橙
    }
    //リセット
    Reset(6, 1134, 4.2);//(tag, attack, keisu)
    switch (sim.weapon.value) {//属性値
        case "1":
            element = 180;
            break;
        case "2":
            element = 180;
            break;
        case "3":
            element = 300;
            break;
        default: break;
    }
    //計算
    CalSkil(keisu, tag);
    CalSharpness();
    //出力
    OutputCommon();
    OutputSharp();
    OutputElement();
    if (unique == 1) {//特殊スキルあり
        var neiro = neiroData[sim.skil_3.value];
        document.getElementById('n').innerHTML =
            `<span style='color:#ff00ff;'>&#9836;</span> 
            <span style='color:${neiro[0]};'>&#9836;</span>
             <span style='color:${neiro[1]};'>&#9836;</span>`;
    } else {//デフォルト
        document.getElementById('n').innerHTML =
            "<span style='color:#ff00ff;'>&#9836;</span> <span style='color:#3cb371;'>&#9836;</span> <span style='color:#00ffff;'>&#9836;</span>";
    }

}
function Start07() {//ランス
    //リセット
    Reset(7, 621, 2.3);//(tag, attack, keisu)
    switch (sim.weapon.value) {//属性値
        case "1":
            element = 180;
            break;
        case "2":
            element = 120;
            break;
        case "3":
            element = 210;
            break;
        default: break;
    }
    //計算
    CalSkil(keisu, tag);
    CalSharpness();
    //出力
    OutputCommon();
    OutputSharp();
    OutputElement();
}
function Start08() {//ガンランス
    var hougeki = "通常型Lv5";//砲撃レベル
    //リセット
    Reset(8, 621, 2.3);//(tag, attack, keisu)
    switch (sim.weapon.value) {//属性値
        case "1":
            element = 180;
            break;
        case "2":
            element = 180;
            break;
        case "3":
            element = 240;
            break;
        default: break;
    }
    //計算
    CalSkil(keisu, tag);
    CalSharpness();

    if (unique == 1) {//特殊スキルあり
        hougeki = sim.skil_3.value;
    }

    //出力
    OutputCommon();
    OutputSharp();
    OutputElement();
    var hougekiResult = document.getElementById("hougekiResult");
    hougekiResult.innerHTML = hougeki;
}
function Start09() {//スラッシュアックス
    var bin = "強撃";
    //リセット
    Reset(9, 945, 3.5);//(tag, attack, keisu)
    switch (sim.weapon.value) {//属性値
        case "1":
            element = 180;
            break;
        case "2":
            element = 180;
            break;
        case "3":
            element = 240;
            break;
        default: break;
    }
    //計算
    CalSkil(keisu, tag);
    CalSharpness();

    if(unique == 2 || unique == 3){//ビン変更が二つ、または星６一つ
        bin = sim.skil_1.value;
    }
    if(unique == 1){//ビン変更が星５以下一つ
        bin = sim.skil_3.value;
    }
    //出力
    OutputCommon();
    OutputSharp();
    OutputElement();
    var binResult = document.getElementById("binResult");
    binResult.innerHTML = bin;
}
function Start10() {//チャージアックス
    var bin;//ビン
    //リセット
    Reset(10, 972, 3.6);//(tag, attack, keisu)
    switch (sim.weapon.value) {//属性値とビン
        case "1":
            element = 180;
            bin = "強属性";
            break;
        case "2":
            element = 120;
            bin = "榴弾";
            break;
        case "3":
            element = 150;
            bin = "榴弾";
            break;
        default: break;
    }
    //計算
    CalSkil(keisu, tag);
    CalSharpness();

    if (unique == 1) {//特殊スキルあり
        bin = sim.skil_3.value;
    }
    //出力
    OutputCommon();
    OutputSharp();
    OutputElement();
    var binResult = document.getElementById("binResult");
    binResult.innerHTML = bin;
}
function Start11() {//操虫棍
    var ryoutyu = "スピード強化";//猟虫ボーナス
    //リセット
    Reset(11, 837, 3.1);//(tag, attack, keisu)
    switch (sim.weapon.value) {//属性値
        case "1":
            element = 150;
            break;
        case "2":
            element = 90;
            break;
        case "3":
            element = 180;
            break;
        default: break;
    }

    //計算
    CalSkil(keisu, tag);
    CalSharpness();

    if (unique == 1) {//特殊スキルあり
        ryoutyu = sim.skil_3.value;
    }
    //出力
    OutputCommon();
    OutputSharp();
    OutputElement();
    var ryoutyuResult = document.getElementById("ryoutyuResult");
    ryoutyuResult.innerHTML = ryoutyu;
}

function Start12() {//ライト

}
function Start13() {//ヘビィ

}
function Start14() {//弓
    var bin = ["接撃", "強撃"];//ビン
    var kyouka = "なし";//ビン強化
    //リセット
    Reset(14, 312, 1.2);//(tag, attack, keisu)
    switch (sim.weapon.value) {//属性値
        case "1":
            element = 120;
            break;
        case "3":
            element = 120;
            break;
        default: break;
    }
    //計算
    CalSkil(keisu, tag);
    CalSharpness();

    if (unique == 3 || unique == 2) {//ビンスキルが二つ、または星６一つ
        bin.push("毒", "麻痺", "睡眠");
        kyouka = "毒ビン強化";
    }
    if(unique == 1){//星５以下のビンスキル一つ
        bin.push("毒", "麻痺");
        kyouka = "毒ビン強化";
    }
    //出力
    OutputCommon();
    OutputSharp();
    OutputElement();
    var binResult = document.getElementById("binResult");
    binResult.innerHTML = bin;
    var kyoukaResult =document.getElementById("kyoukaResult");
    kyoukaResult.innerHTML = kyouka;
}