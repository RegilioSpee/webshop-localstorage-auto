const MaandNummer = maand => {
  let nummer;
  switch (maand) {
    case "januari":
      nummer = 0;
      break;
    case "februari":
      nummer = 1;
      break;
    case "maart":
      nummer = 2;
      break;
    case "april":
      nummer = 3;
      break;
    case "mei":
      nummer = 4;
      break;
    case "juni":
      nummer = 5;
      break;
    case "july":
      nummer = 6;
      break;
    case "augustus":
      nummer = 7;
      break;
    case "september":
      nummer = 8;
      break;
    case "oktober":
      nummer = 9;
      break;
    case "november":
      nummer = 10;
      break;
    case "december":
      nummer = 11;
      break;
  }
};

const draaiTekst = string => {
  if (string.indexOf(",") != -1) {
    let array = string.split(",");
    string = array[1] + " " + array[0];
  }
  return string;
};

let winkelwagenObj = {
  items: [],

  ItemsOphalen: function() {
    let bestelling;
    if (localStorage.getItem("besteldeAutos") == null) {
      bestelling = [];
    } else {
      bestelling = JSON.parse(localStorage.getItem("besteldeAutos"));
      document.getElementById("winkelwagen__aantal").innerHTML =
        bestelling.length;
    }
    bestelling.forEach(item => {
      this.items.push(item);
    });

    return bestelling;
  },

  verwijderItem: function(modelnummer) {
    this.items.forEach((item, index) => {
      if (item.modelnummer == modelnummer) {
        this.items.splice(index, 1);
        modelnummer = 4;
      }
    });
    localStorage.setItem("besteldeAutos", JSON.stringify(this.items));
    if (this.items.length > 0) {
      document.getElementById(
        "winkelwagen__aantal"
      ).innerHTML = this.items.length;
    } else {
      document.getElementById("winkelwagen__aantal").innerHTML = "";
    }
    this.uitvoeren();
  },

  totaalPrijsBerekenen: function() {
    let totaal = 0;
    this.items.forEach(auto => {
      totaal += auto.prijs;
    });
    return totaal;
  },

  verzendKosten: function() {
    let kosten = 9.99;
    if (this.totaalPrijsBerekenen() > 70) {
      kosten = 0;
    }
    return kosten;
  },

  totalenPrijs: function() {
    let totaalAlles = 0;
    totaalAlles = this.totaalPrijsBerekenen() + this.verzendKosten();
    return totaalAlles;
  },

  uitvoeren: function() {
    let aantalAutos = 0;
    document.getElementById("besteluitvoer").innerHTML = "";
    this.items.forEach(auto => {
      let sectie = document.createElement("section");
      sectie.className = "autobesteld";

      let merk = document.createElement("h3");
      merk.className = "autobesteld__merk";
      merk.textContent = auto.merk;

      let afbeelding = document.createElement("img");
      afbeelding.className = "autobesteld__cover";
      afbeelding.setAttribute("src", auto.cover);
      afbeelding.setAttribute("alt", auto.merk);

      let aantal = document.createElement("input");
      let aantalAuto = auto.aantal;
      aantal.className = "autobesteld__aantal";
      aantal.setAttribute("type", "number");
      aantal.setAttribute("value", aantalAuto);

      let prijs = document.createElement("div");
      prijs.className = "autobesteld__prijs";
      prijs.textContent = auto.prijs.toLocaleString("nl-NL", {
        currency: "EUR",
        style: "currency"
      });

      let verwijder = document.createElement("div");
      verwijder.className = "autobesteld__verwijder";
      verwijder.addEventListener("click", () => {
        this.verwijderItem(auto.modelnummer);
      });

      sectie.appendChild(afbeelding);
      sectie.appendChild(merk);
      sectie.appendChild(aantal);
      sectie.appendChild(prijs);
      sectie.appendChild(verwijder);
      document.getElementById("besteluitvoer").appendChild(sectie);
      aantalAutos++;
    });

    if (this.totalenPrijs() > 9.99) {
      let sectieTotaal = document.createElement("section");
      sectieTotaal.className = "autobesteld";

      let totaalTekst = document.createElement("div");
      totaalTekst.className = "totaalTekst";
      totaalTekst.innerHTML = "Totaal Artikelen(" + aantalAutos + "): ";

      let totaalPrijs = document.createElement("div");
      totaalPrijs.className = "totaalPrijs";
      totaalPrijs.innerHTML = this.totaalPrijsBerekenen().toLocaleString(
        "nl-NL",
        { currency: "EUR", style: "currency" }
      );

      let sectieVerzend = document.createElement("section");
      sectieVerzend.className = "autobesteld";

      let verzendTekst = document.createElement("div");
      verzendTekst.className = "totaalTekst";
      verzendTekst.innerHTML = "Verzendkosten: ";

      let verzendPrijs = document.createElement("div");
      verzendPrijs.className = "verzendPrijs";
      verzendPrijs.innerHTML = this.verzendKosten().toLocaleString("nl-NL", {
        currency: "EUR",
        style: "currency"
      });

      let verzendInfo = document.createElement("div");
      verzendInfo.className = "verzendInfo";
      verzendInfo.setAttribute("onmouseover", "display()");
      verzendInfo.setAttribute("onmouseout", "hide()");

      let verzendModaal = document.createElement("div");
      verzendModaal.className = "verzendModaal";
      verzendModaal.id = "verzendModaal";
      verzendModaal.innerHTML =
        "Bij een bestelling boven de 50 euro hoeft u geen verzendkosten te betalen.";

      let sectieTotaal2 = document.createElement("section");
      sectieTotaal2.className = "autobesteld";

      let totaalTekst2 = document.createElement("div");
      totaalTekst2.className = "totaalTekst";
      totaalTekst2.innerHTML = "Totaal: ";

      let totaalPrijs2 = document.createElement("div");
      totaalPrijs2.className = "totaalPrijs";
      totaalPrijs2.innerHTML = this.totalenPrijs().toLocaleString("nl-NL", {
        currency: "EUR",
        style: "currency"
      });

      sectieTotaal.appendChild(totaalTekst);
      sectieTotaal.appendChild(totaalPrijs);
      document.getElementById("besteluitvoer").appendChild(sectieTotaal);

      sectieVerzend.appendChild(verzendModaal);
      sectieVerzend.appendChild(verzendTekst);
      sectieVerzend.appendChild(verzendPrijs);
      sectieVerzend.appendChild(verzendInfo);
      document.getElementById("besteluitvoer").appendChild(sectieVerzend);

      sectieTotaal2.appendChild(totaalTekst2);
      sectieTotaal2.appendChild(totaalPrijs2);
      document.getElementById("besteluitvoer").appendChild(sectieTotaal2);
    } else {
      let emptySectie = document.createElement("section");
      emptySectie.className = "emptySection";

      let emptyMerk = document.createElement("div");
      emptyMerk.className = "emptyMerk";
      emptyMerk.innerHTML = "Uw heeft geen items!";

      let emptyImage = document.createElement("div");
      emptyImage.className = "emptyImage";

      emptySectie.appendChild(emptyImage);
      emptySectie.appendChild(emptyMerk);
      document.getElementById("besteluitvoer").appendChild(emptySectie);
    }

    if (this.items.length > 0) {
      document.getElementById(
        "winkelwagen__aantal"
      ).innerHTML = this.items.length;
    } else {
      document.getElementById("winkelwagen__aantal").innerHTML = "";
    }
  }
};

winkelwagenObj.ItemsOphalen();
winkelwagenObj.uitvoeren();
let modaal = document.getElementById("verzendModaal");
function display() {
  modaal.style.display = "inherit";
}
function hide() {
  modaal.style.display = "none";
}
