const app = angular.module('FabLatApp', [ 'ui.router', 'ngMaterial', 'ngMessages', 'angularMoment',
    'vsGoogleAutocomplete', 'ngFileUpload', 'cloudinary' ]);

// Countries obtained from API call on Oct 23, 2023: https://restcountries.com/v3.1/all?fields=name,flags,cca3
const countriesUnsorted = [{"flags":{"png":"https://flagcdn.com/w320/uz.png","svg":"https://flagcdn.com/uz.svg","alt":"The flag of Uzbekistan is composed of three equal horizontal bands of turquoise, white with red top and bottom edges, and green. On the hoist side of the turquoise band is a fly-side facing white crescent and twelve five-pointed white stars arranged just outside the crescent opening in three rows comprising three, four and five stars."},"name":{"common":"Uzbekistan","official":"Republic of Uzbekistan","nativeName":{"rus":{"official":"Республика Узбекистан","common":"Узбекистан"},"uzb":{"official":"O'zbekiston Respublikasi","common":"O‘zbekiston"}}},"cca3":"UZB"},{"flags":{"png":"https://flagcdn.com/w320/at.png","svg":"https://flagcdn.com/at.svg","alt":"The flag of Austria is composed of three equal horizontal bands of red, white and red."},"name":{"common":"Austria","official":"Republic of Austria","nativeName":{"bar":{"official":"Republik Österreich","common":"Österreich"}}},"cca3":"AUT"},{"flags":{"png":"https://flagcdn.com/w320/sl.png","svg":"https://flagcdn.com/sl.svg","alt":"The flag of Sierra Leone is composed of three equal horizontal bands of green, white and blue."},"name":{"common":"Sierra Leone","official":"Republic of Sierra Leone","nativeName":{"eng":{"official":"Republic of Sierra Leone","common":"Sierra Leone"}}},"cca3":"SLE"},{"flags":{"png":"https://flagcdn.com/w320/cc.png","svg":"https://flagcdn.com/cc.svg","alt":""},"name":{"common":"Cocos (Keeling) Islands","official":"Territory of the Cocos (Keeling) Islands","nativeName":{"eng":{"official":"Territory of the Cocos (Keeling) Islands","common":"Cocos (Keeling) Islands"}}},"cca3":"CCK"},{"flags":{"png":"https://flagcdn.com/w320/mr.png","svg":"https://flagcdn.com/mr.svg","alt":"The flag of Mauritania has a green field with a thin red horizontal band at the top and bottom of the field. At the center of the field is a five-pointed yellow star above an upward facing yellow crescent."},"name":{"common":"Mauritania","official":"Islamic Republic of Mauritania","nativeName":{"ara":{"official":"الجمهورية الإسلامية الموريتانية","common":"موريتانيا"}}},"cca3":"MRT"},{"flags":{"png":"https://flagcdn.com/w320/il.png","svg":"https://flagcdn.com/il.svg","alt":"The flag of Israel has a white field with a blue hexagram — the Magen David — centered between two equal horizontal blue bands situated near the top and bottom edges of the field."},"name":{"common":"Israel","official":"State of Israel","nativeName":{"ara":{"official":"دولة إسرائيل","common":"إسرائيل"},"heb":{"official":"מדינת ישראל","common":"ישראל"}}},"cca3":"ISR"},{"flags":{"png":"https://flagcdn.com/w320/md.png","svg":"https://flagcdn.com/md.svg","alt":"The flag of Moldova is composed of three equal vertical bands of blue, yellow and red, with the national coat of arms centered in the yellow band."},"name":{"common":"Moldova","official":"Republic of Moldova","nativeName":{"ron":{"official":"Republica Moldova","common":"Moldova"}}},"cca3":"MDA"},{"flags":{"png":"https://flagcdn.com/w320/fj.png","svg":"https://flagcdn.com/fj.svg","alt":"The flag of Fiji has a light blue field. It features the flag of the United Kingdom — the Union Jack — in the canton and the shield of the national coat of arms centered in the fly half."},"name":{"common":"Fiji","official":"Republic of Fiji","nativeName":{"eng":{"official":"Republic of Fiji","common":"Fiji"},"fij":{"official":"Matanitu Tugalala o Viti","common":"Viti"},"hif":{"official":"रिपब्लिक ऑफ फीजी","common":"फिजी"}}},"cca3":"FJI"},{"flags":{"png":"https://flagcdn.com/w320/rs.png","svg":"https://flagcdn.com/rs.svg","alt":"The flag of Serbia is composed of three equal horizontal bands of red, blue and white. The coat of arms of Serbia is superimposed at the center of the field slightly towards the hoist side."},"name":{"common":"Serbia","official":"Republic of Serbia","nativeName":{"srp":{"official":"Република Србија","common":"Србија"}}},"cca3":"SRB"},{"flags":{"png":"https://flagcdn.com/w320/cm.png","svg":"https://flagcdn.com/cm.svg","alt":"The flag of Cameroon is composed of three equal vertical bands of green, red and yellow, with a yellow five-pointed star in the center."},"name":{"common":"Cameroon","official":"Republic of Cameroon","nativeName":{"eng":{"official":"Republic of Cameroon","common":"Cameroon"},"fra":{"official":"République du Cameroun","common":"Cameroun"}}},"cca3":"CMR"},{"flags":{"png":"https://flagcdn.com/w320/bs.png","svg":"https://flagcdn.com/bs.svg","alt":"The flag of the Bahamas is composed of three equal horizontal bands of aquamarine, yellow and aquamarine, with a black equilateral triangle superimposed on the hoist side of the field. This triangle has its base on the hoist end and spans about one-third the width of the field."},"name":{"common":"Bahamas","official":"Commonwealth of the Bahamas","nativeName":{"eng":{"official":"Commonwealth of the Bahamas","common":"Bahamas"}}},"cca3":"BHS"},{"flags":{"png":"https://flagcdn.com/w320/nr.png","svg":"https://flagcdn.com/nr.svg","alt":"The flag of Nauru has a dark blue field with a thin yellow horizontal band across the center and a large white twelve-pointed star beneath the horizontal band on the hoist side of the field."},"name":{"common":"Nauru","official":"Republic of Nauru","nativeName":{"eng":{"official":"Republic of Nauru","common":"Nauru"},"nau":{"official":"Republic of Nauru","common":"Nauru"}}},"cca3":"NRU"},{"flags":{"png":"https://flagcdn.com/w320/cz.png","svg":"https://flagcdn.com/cz.svg","alt":"The flag of Czechia is composed of two equal horizontal bands of white and red, with a blue isosceles triangle superimposed on the hoist side of the field. The triangle has its base on the hoist end and spans about two-fifth the width of the field."},"name":{"common":"Czechia","official":"Czech Republic","nativeName":{"ces":{"official":"Česká republika","common":"Česko"},"slk":{"official":"Česká republika","common":"Česko"}}},"cca3":"CZE"},{"flags":{"png":"https://flagcdn.com/w320/eg.png","svg":"https://flagcdn.com/eg.svg","alt":"The flag of Egypt is composed of three equal horizontal bands of red, white and black, with Egypt's national emblem — a hoist-side facing gold eagle of Saladin — centered in the white band."},"name":{"common":"Egypt","official":"Arab Republic of Egypt","nativeName":{"ara":{"official":"جمهورية مصر العربية","common":"مصر"}}},"cca3":"EGY"},{"flags":{"png":"https://flagcdn.com/w320/mm.png","svg":"https://flagcdn.com/mm.svg","alt":"The flag of Myanmar is composed of three equal horizontal bands of yellow, green and red, with a large five-pointed white star superimposed at the center of the field."},"name":{"common":"Myanmar","official":"Republic of the Union of Myanmar","nativeName":{"mya":{"official":"ပြည်ထောင်စု သမ္မတ မြန်မာနိုင်ငံတော်","common":"မြန်မာ"}}},"cca3":"MMR"},{"flags":{"png":"https://flagcdn.com/w320/nl.png","svg":"https://flagcdn.com/nl.svg","alt":"The flag of the Netherlands is composed of three equal horizontal bands of red, white and blue."},"name":{"common":"Netherlands","official":"Kingdom of the Netherlands","nativeName":{"nld":{"official":"Koninkrijk der Nederlanden","common":"Nederland"}}},"cca3":"NLD"},{"flags":{"png":"https://flagcdn.com/w320/uy.png","svg":"https://flagcdn.com/uy.svg","alt":"The flag of Uruguay is composed of nine equal horizontal bands of white alternating with blue, with a white square superimposed in the canton. In the white square is a yellow sun bearing a human face — the Sun of May — from which sixteen rays extend. The sun's rays alternate between triangular and wavy."},"name":{"common":"Uruguay","official":"Oriental Republic of Uruguay","nativeName":{"spa":{"official":"República Oriental del Uruguay","common":"Uruguay"}}},"cca3":"URY"},{"flags":{"png":"https://flagcdn.com/w320/mp.png","svg":"https://flagcdn.com/mp.svg","alt":""},"name":{"common":"Northern Mariana Islands","official":"Commonwealth of the Northern Mariana Islands","nativeName":{"cal":{"official":"Commonwealth of the Northern Mariana Islands","common":"Northern Mariana Islands"},"cha":{"official":"Sankattan Siha Na Islas Mariånas","common":"Na Islas Mariånas"},"eng":{"official":"Commonwealth of the Northern Mariana Islands","common":"Northern Mariana Islands"}}},"cca3":"MNP"},{"flags":{"png":"https://flagcdn.com/w320/cf.png","svg":"https://flagcdn.com/cf.svg","alt":"The flag of Central African Republic is composed of four equal horizontal bands of blue, white, green and yellow intersected at the center by a vertical red band of equal size as the horizontal bands. A yellow five-pointed star is situated on the hoist side of the blue band."},"name":{"common":"Central African Republic","official":"Central African Republic","nativeName":{"fra":{"official":"République centrafricaine","common":"République centrafricaine"},"sag":{"official":"Ködörösêse tî Bêafrîka","common":"Bêafrîka"}}},"cca3":"CAF"},{"flags":{"png":"https://flagcdn.com/w320/sh.png","svg":"https://flagcdn.com/sh.svg","alt":""},"name":{"common":"Saint Helena, Ascension and Tristan da Cunha","official":"Saint Helena, Ascension and Tristan da Cunha","nativeName":{"eng":{"official":"Saint Helena, Ascension and Tristan da Cunha","common":"Saint Helena, Ascension and Tristan da Cunha"}}},"cca3":"SHN"},{"flags":{"png":"https://flagcdn.com/w320/gq.png","svg":"https://flagcdn.com/gq.svg","alt":"The flag of Equatorial Guinea is composed of three equal horizontal bands of green, white and red with the national coat of arms centered in the white band and an isosceles triangle superimposed on the hoist side of the field. The triangle is light blue, has its base on the hoist end and spans about one-fifth the width of the field."},"name":{"common":"Equatorial Guinea","official":"Republic of Equatorial Guinea","nativeName":{"fra":{"official":"République de la Guinée Équatoriale","common":"Guinée équatoriale"},"por":{"official":"República da Guiné Equatorial","common":"Guiné Equatorial"},"spa":{"official":"República de Guinea Ecuatorial","common":"Guinea Ecuatorial"}}},"cca3":"GNQ"},{"flags":{"png":"https://flagcdn.com/w320/co.png","svg":"https://flagcdn.com/co.svg","alt":"The flag of Colombia is composed of three horizontal bands of yellow, blue and red, with the yellow band twice the height of the other two bands."},"name":{"common":"Colombia","official":"Republic of Colombia","nativeName":{"spa":{"official":"República de Colombia","common":"Colombia"}}},"cca3":"COL"},{"flags":{"png":"https://flagcdn.com/w320/kg.png","svg":"https://flagcdn.com/kg.svg","alt":"The flag of Kyrgyzstan features a yellow sun with forty rays at the center of a red field. At the center of the sun is a stylized depiction of a tunduk."},"name":{"common":"Kyrgyzstan","official":"Kyrgyz Republic","nativeName":{"kir":{"official":"Кыргыз Республикасы","common":"Кыргызстан"},"rus":{"official":"Кыргызская Республика","common":"Киргизия"}}},"cca3":"KGZ"},{"flags":{"png":"https://flagcdn.com/w320/es.png","svg":"https://flagcdn.com/es.svg","alt":"The flag of Spain is composed of three horizontal bands of red, yellow and red, with the yellow band twice the height of the red bands. In the yellow band is the national coat of arms offset slightly towards the hoist side of center."},"name":{"common":"Spain","official":"Kingdom of Spain","nativeName":{"spa":{"official":"Reino de España","common":"España"}}},"cca3":"ESP"},{"flags":{"png":"https://flagcdn.com/w320/mw.png","svg":"https://flagcdn.com/mw.svg","alt":"The flag of Malawi is composed of three equal horizontal bands of black, red and green. The top half of a red sun with thirty-one visible rays is centered in the black band."},"name":{"common":"Malawi","official":"Republic of Malawi","nativeName":{"eng":{"official":"Republic of Malawi","common":"Malawi"},"nya":{"official":"Chalo cha Malawi, Dziko la Malaŵi","common":"Malaŵi"}}},"cca3":"MWI"},{"flags":{"png":"https://flagcdn.com/w320/hu.png","svg":"https://flagcdn.com/hu.svg","alt":"The flag of Hungary is composed of three equal horizontal bands of red, white and green."},"name":{"common":"Hungary","official":"Hungary","nativeName":{"hun":{"official":"Magyarország","common":"Magyarország"}}},"cca3":"HUN"},{"flags":{"png":"https://flagcdn.com/w320/mc.png","svg":"https://flagcdn.com/mc.svg","alt":"The flag of Monaco is composed of two equal horizontal bands of red and white."},"name":{"common":"Monaco","official":"Principality of Monaco","nativeName":{"fra":{"official":"Principauté de Monaco","common":"Monaco"}}},"cca3":"MCO"},{"flags":{"png":"https://flagcdn.com/w320/cv.png","svg":"https://flagcdn.com/cv.svg","alt":"The flag of Cape Verde is composed of five horizontal bands of blue, white, red, white and blue in the ratio of 6:1:1:1:3. A ring of ten five-pointed yellow stars is centered at three-eighth of the height from the bottom edge and three-eighth of the width from the hoist end of the field."},"name":{"common":"Cape Verde","official":"Republic of Cabo Verde","nativeName":{"por":{"official":"República de Cabo Verde","common":"Cabo Verde"}}},"cca3":"CPV"},{"flags":{"png":"https://flagcdn.com/w320/za.png","svg":"https://flagcdn.com/za.svg","alt":"The flag of South Africa is composed of two equal horizontal bands of red and blue, with a yellow-edged black isosceles triangle superimposed on the hoist side of the field. This triangle has its base centered on the hoist end, spans about two-fifth the width and two-third the height of the field, and is enclosed on its sides by the arms of a white-edged green horizontally oriented Y-shaped band which extends along the boundary of the red and blue bands to the fly end of the field."},"name":{"common":"South Africa","official":"Republic of South Africa","nativeName":{"afr":{"official":"Republiek van Suid-Afrika","common":"South Africa"},"eng":{"official":"Republic of South Africa","common":"South Africa"},"nbl":{"official":"IRiphabliki yeSewula Afrika","common":"Sewula Afrika"},"nso":{"official":"Rephaboliki ya Afrika-Borwa ","common":"Afrika-Borwa"},"sot":{"official":"Rephaboliki ya Afrika Borwa","common":"Afrika Borwa"},"ssw":{"official":"IRiphabhulikhi yeNingizimu Afrika","common":"Ningizimu Afrika"},"tsn":{"official":"Rephaboliki ya Aforika Borwa","common":"Aforika Borwa"},"tso":{"official":"Riphabliki ra Afrika Dzonga","common":"Afrika Dzonga"},"ven":{"official":"Riphabuḽiki ya Afurika Tshipembe","common":"Afurika Tshipembe"},"xho":{"official":"IRiphabliki yaseMzantsi Afrika","common":"Mzantsi Afrika"},"zul":{"official":"IRiphabliki yaseNingizimu Afrika","common":"Ningizimu Afrika"}}},"cca3":"ZAF"},{"flags":{"png":"https://flagcdn.com/w320/dk.png","svg":"https://flagcdn.com/dk.svg","alt":"The flag of Denmark has a red field with a large white cross that extend to the edges of the field. The vertical part of this cross is offset towards the hoist side."},"name":{"common":"Denmark","official":"Kingdom of Denmark","nativeName":{"dan":{"official":"Kongeriget Danmark","common":"Danmark"}}},"cca3":"DNK"},{"flags":{"png":"https://flagcdn.com/w320/gp.png","svg":"https://flagcdn.com/gp.svg","alt":""},"name":{"common":"Guadeloupe","official":"Guadeloupe","nativeName":{"fra":{"official":"Guadeloupe","common":"Guadeloupe"}}},"cca3":"GLP"},{"flags":{"png":"https://flagcdn.com/w320/ie.png","svg":"https://flagcdn.com/ie.svg","alt":"The flag of Ireland is composed of three equal vertical bands of green, white and orange."},"name":{"common":"Ireland","official":"Republic of Ireland","nativeName":{"eng":{"official":"Republic of Ireland","common":"Ireland"},"gle":{"official":"Poblacht na hÉireann","common":"Éire"}}},"cca3":"IRL"},{"flags":{"png":"https://flagcdn.com/w320/mt.png","svg":"https://flagcdn.com/mt.svg","alt":"The flag of Malta is composed of two equal vertical bands of white and red. A representation of the George cross edged in red is situated on the upper hoist-side corner of the white band."},"name":{"common":"Malta","official":"Republic of Malta","nativeName":{"eng":{"official":"Republic of Malta","common":"Malta"},"mlt":{"official":"Repubblika ta ' Malta","common":"Malta"}}},"cca3":"MLT"},{"flags":{"png":"https://flagcdn.com/w320/wf.png","svg":"https://flagcdn.com/wf.svg","alt":""},"name":{"common":"Wallis and Futuna","official":"Territory of the Wallis and Futuna Islands","nativeName":{"fra":{"official":"Territoire des îles Wallis et Futuna","common":"Wallis et Futuna"}}},"cca3":"WLF"},{"flags":{"png":"https://flagcdn.com/w320/sr.png","svg":"https://flagcdn.com/sr.svg","alt":"The flag of Suriname is composed of five horizontal bands of green, white, red, white and green in the ratio of 2:1:4:1:2. A large five-pointed yellow star is centered in the red band."},"name":{"common":"Suriname","official":"Republic of Suriname","nativeName":{"nld":{"official":"Republiek Suriname","common":"Suriname"}}},"cca3":"SUR"},{"flags":{"png":"https://flagcdn.com/w320/va.png","svg":"https://flagcdn.com/va.svg","alt":"The flag of Vatican City is square shaped. It is composed of two equal vertical bands of yellow and white, with national coat of arms centered in the white band. The national coat of arms comprises the Papal Tiara superimposed on two crossed keys."},"name":{"common":"Vatican City","official":"Vatican City State","nativeName":{"ita":{"official":"Stato della Città del Vaticano","common":"Vaticano"},"lat":{"official":"Status Civitatis Vaticanæ","common":"Vaticanæ"}}},"cca3":"VAT"},{"flags":{"png":"https://flagcdn.com/w320/ml.png","svg":"https://flagcdn.com/ml.svg","alt":"The flag of Mali is composed of three equal vertical bands of green, yellow and red."},"name":{"common":"Mali","official":"Republic of Mali","nativeName":{"fra":{"official":"République du Mali","common":"Mali"}}},"cca3":"MLI"},{"flags":{"png":"https://flagcdn.com/w320/to.png","svg":"https://flagcdn.com/to.svg","alt":"The flag of Tonga has a red field. A white rectangle bearing a red Greek cross is superimposed in the canton."},"name":{"common":"Tonga","official":"Kingdom of Tonga","nativeName":{"eng":{"official":"Kingdom of Tonga","common":"Tonga"},"ton":{"official":"Kingdom of Tonga","common":"Tonga"}}},"cca3":"TON"},{"flags":{"png":"https://flagcdn.com/w320/sm.png","svg":"https://flagcdn.com/sm.svg","alt":"The flag of San Marino is composed of two equal horizontal bands of white and light blue, with the national coat of arms superimposed in the center."},"name":{"common":"San Marino","official":"Republic of San Marino","nativeName":{"ita":{"official":"Repubblica di San Marino","common":"San Marino"}}},"cca3":"SMR"},{"flags":{"png":"https://flagcdn.com/w320/bl.png","svg":"https://flagcdn.com/bl.svg","alt":""},"name":{"common":"Saint Barthélemy","official":"Collectivity of Saint Barthélemy","nativeName":{"fra":{"official":"Collectivité de Saint-Barthélemy","common":"Saint-Barthélemy"}}},"cca3":"BLM"},{"flags":{"png":"https://flagcdn.com/w320/gi.png","svg":"https://flagcdn.com/gi.svg","alt":""},"name":{"common":"Gibraltar","official":"Gibraltar","nativeName":{"eng":{"official":"Gibraltar","common":"Gibraltar"}}},"cca3":"GIB"},{"flags":{"png":"https://flagcdn.com/w320/ca.png","svg":"https://flagcdn.com/ca.svg","alt":"The flag of Canada is composed of a red vertical band on the hoist and fly sides and a central white square that is twice the width of the vertical bands. A large eleven-pointed red maple leaf is centered in the white square."},"name":{"common":"Canada","official":"Canada","nativeName":{"eng":{"official":"Canada","common":"Canada"},"fra":{"official":"Canada","common":"Canada"}}},"cca3":"CAN"},{"flags":{"png":"https://flagcdn.com/w320/bj.png","svg":"https://flagcdn.com/bj.svg","alt":"The flag of Benin features a green vertical band on its hoist side that takes up about two-fifth the width of the field and two equal horizontal bands of yellow and red adjoining the vertical band."},"name":{"common":"Benin","official":"Republic of Benin","nativeName":{"fra":{"official":"République du Bénin","common":"Bénin"}}},"cca3":"BEN"},{"flags":{"png":"https://flagcdn.com/w320/gu.png","svg":"https://flagcdn.com/gu.svg","alt":""},"name":{"common":"Guam","official":"Guam","nativeName":{"cha":{"official":"Guåhån","common":"Guåhån"},"eng":{"official":"Guam","common":"Guam"},"spa":{"official":"Guam","common":"Guam"}}},"cca3":"GUM"},{"flags":{"png":"https://flagcdn.com/w320/kp.png","svg":"https://flagcdn.com/kp.svg","alt":"The flag of North Korea is composed of three horizontal bands — a large central white-edged red band, and a blue band above and beneath the red band. On the hoist side of the red band is a red five-pointed star within a white circle."},"name":{"common":"North Korea","official":"Democratic People's Republic of Korea","nativeName":{"kor":{"official":"조선민주주의인민공화국","common":"조선"}}},"cca3":"PRK"},{"flags":{"png":"https://flagcdn.com/w320/tv.png","svg":"https://flagcdn.com/tv.svg","alt":"The flag of Tuvalu has a light blue field with the flag of the United Kingdom — the Union Jack — in the canton. A representation of the country's nine Islands using nine five-pointed yellow stars is situated in the fly half of the field."},"name":{"common":"Tuvalu","official":"Tuvalu","nativeName":{"eng":{"official":"Tuvalu","common":"Tuvalu"},"tvl":{"official":"Tuvalu","common":"Tuvalu"}}},"cca3":"TUV"},{"flags":{"png":"https://flagcdn.com/w320/pa.png","svg":"https://flagcdn.com/pa.svg","alt":"The flag of Panama is composed of four equal rectangular areas — a white rectangular area with a blue five-pointed star at its center, a red rectangular area, a white rectangular area with a red five-pointed star at its center, and a blue rectangular area — in the upper hoist side, upper fly side, lower fly side and lower hoist side respectively."},"name":{"common":"Panama","official":"Republic of Panama","nativeName":{"spa":{"official":"República de Panamá","common":"Panamá"}}},"cca3":"PAN"},{"flags":{"png":"https://flagcdn.com/w320/rw.png","svg":"https://flagcdn.com/rw.svg","alt":"The flag of Rwanda is composed of three horizontal bands of light blue, yellow and green. The light blue band is twice the height of the other two bands and bears a yellow sun with twenty-four rays on its fly side."},"name":{"common":"Rwanda","official":"Republic of Rwanda","nativeName":{"eng":{"official":"Republic of Rwanda","common":"Rwanda"},"fra":{"official":"République rwandaise","common":"Rwanda"},"kin":{"official":"Repubulika y'u Rwanda","common":"Rwanda"}}},"cca3":"RWA"},{"flags":{"png":"https://flagcdn.com/w320/cg.png","svg":"https://flagcdn.com/cg.svg","alt":"The flag of the Republic of the Congo features a yellow diagonal band that extends from the lower hoist-side corner to the upper fly-side corner of the field. Above and beneath this band are a green and red triangle respectively."},"name":{"common":"Republic of the Congo","official":"Republic of the Congo","nativeName":{"fra":{"official":"République du Congo","common":"République du Congo"},"kon":{"official":"Repubilika ya Kongo","common":"Repubilika ya Kongo"},"lin":{"official":"Republíki ya Kongó","common":"Republíki ya Kongó"}}},"cca3":"COG"},{"flags":{"png":"https://flagcdn.com/w320/jm.png","svg":"https://flagcdn.com/jm.svg","alt":"The flag of Jamaica is divided by a gold diagonal cross into four alternating triangular areas of green at the top and bottom, and black on the hoist and fly sides"},"name":{"common":"Jamaica","official":"Jamaica","nativeName":{"eng":{"official":"Jamaica","common":"Jamaica"},"jam":{"official":"Jamaica","common":"Jamaica"}}},"cca3":"JAM"},{"flags":{"png":"https://flagcdn.com/w320/bh.png","svg":"https://flagcdn.com/bh.svg","alt":"The flag of Bahrain has a red field. On the hoist side, it features a white vertical band that spans about one-third the width of the field and is separated from the rest of the field by five adjoining fly-side pointing white isosceles triangles that serve as a serrated line."},"name":{"common":"Bahrain","official":"Kingdom of Bahrain","nativeName":{"ara":{"official":"مملكة البحرين","common":"‏البحرين"}}},"cca3":"BHR"},{"flags":{"png":"https://flagcdn.com/w320/sx.png","svg":"https://flagcdn.com/sx.svg","alt":""},"name":{"common":"Sint Maarten","official":"Sint Maarten","nativeName":{"eng":{"official":"Sint Maarten","common":"Sint Maarten"},"fra":{"official":"Saint-Martin","common":"Saint-Martin"},"nld":{"official":"Sint Maarten","common":"Sint Maarten"}}},"cca3":"SXM"},{"flags":{"png":"https://flagcdn.com/w320/tc.png","svg":"https://flagcdn.com/tc.svg","alt":""},"name":{"common":"Turks and Caicos Islands","official":"Turks and Caicos Islands","nativeName":{"eng":{"official":"Turks and Caicos Islands","common":"Turks and Caicos Islands"}}},"cca3":"TCA"},{"flags":{"png":"https://flagcdn.com/w320/pk.png","svg":"https://flagcdn.com/pk.svg","alt":"The flag of Pakistan is composed of a white vertical band on its hoist side that takes up about one-fourth the width of the field and a dark green rectangular area that spans the rest of the field. A white fly-side facing crescent and five-pointed star are centered in the dark green area."},"name":{"common":"Pakistan","official":"Islamic Republic of Pakistan","nativeName":{"eng":{"official":"Islamic Republic of Pakistan","common":"Pakistan"},"urd":{"official":"اسلامی جمہوریۂ پاكستان","common":"پاكستان"}}},"cca3":"PAK"},{"flags":{"png":"https://flagcdn.com/w320/kz.png","svg":"https://flagcdn.com/kz.svg","alt":"The flag of Kazakhstan has a turquoise field, at the center of which is a gold sun with thirty-two rays above a soaring golden steppe eagle. A thin vertical band displays a national ornamental pattern — koshkar-muiz — in gold near the hoist end."},"name":{"common":"Kazakhstan","official":"Republic of Kazakhstan","nativeName":{"kaz":{"official":"Қазақстан Республикасы","common":"Қазақстан"},"rus":{"official":"Республика Казахстан","common":"Казахстан"}}},"cca3":"KAZ"},{"flags":{"png":"https://flagcdn.com/w320/la.png","svg":"https://flagcdn.com/la.svg","alt":"The flag of Laos is composed of three horizontal bands of red, blue and red. The blue band is twice the height of the red bands and bears a white circle at its center."},"name":{"common":"Laos","official":"Lao People's Democratic Republic","nativeName":{"lao":{"official":"ສາທາລະນະ ຊາທິປະໄຕ ຄົນລາວ ຂອງ","common":"ສປປລາວ"}}},"cca3":"LAO"},{"flags":{"png":"https://flagcdn.com/w320/tt.png","svg":"https://flagcdn.com/tt.svg","alt":"The flag of Trinidad and Tobago has a red field with a white-edged black diagonal band that extends from the upper hoist-side corner to the lower fly-side corner of the field."},"name":{"common":"Trinidad and Tobago","official":"Republic of Trinidad and Tobago","nativeName":{"eng":{"official":"Republic of Trinidad and Tobago","common":"Trinidad and Tobago"}}},"cca3":"TTO"},{"flags":{"png":"https://flagcdn.com/w320/me.png","svg":"https://flagcdn.com/me.svg","alt":"The flag of Montenegro features a large red central rectangular area surrounded by a golden-yellow border. The coat of arms of Montenegro is centered in the red rectangle."},"name":{"common":"Montenegro","official":"Montenegro","nativeName":{"cnr":{"official":"Црна Гора","common":"Црна Гора"}}},"cca3":"MNE"},{"flags":{"png":"https://flagcdn.com/w320/nu.png","svg":"https://flagcdn.com/nu.svg","alt":""},"name":{"common":"Niue","official":"Niue","nativeName":{"eng":{"official":"Niue","common":"Niue"},"niu":{"official":"Niuē","common":"Niuē"}}},"cca3":"NIU"},{"flags":{"png":"https://flagcdn.com/w320/lr.png","svg":"https://flagcdn.com/lr.svg","alt":"The flag of Liberia is composed of eleven equal horizontal bands of red alternating with white. A blue square bearing a five-pointed white star is superimposed in the canton."},"name":{"common":"Liberia","official":"Republic of Liberia","nativeName":{"eng":{"official":"Republic of Liberia","common":"Liberia"}}},"cca3":"LBR"},{"flags":{"png":"https://flagcdn.com/w320/gd.png","svg":"https://flagcdn.com/gd.svg","alt":"The flag of Grenada features a large central rectangular area surrounded by a red border, with three five-pointed yellow stars centered on the top and bottom borders. The central rectangle is divided diagonally into four alternating triangular areas of yellow at the top and bottom and green on the hoist and fly sides, and a five-pointed yellow star on a red circle is superimposed at its center. A symbolic nutmeg pod is situated on the green hoist-side triangle."},"name":{"common":"Grenada","official":"Grenada","nativeName":{"eng":{"official":"Grenada","common":"Grenada"}}},"cca3":"GRD"},{"flags":{"png":"https://flagcdn.com/w320/pg.png","svg":"https://flagcdn.com/pg.svg","alt":"The flag of Papua New Guinea is divided diagonally, from the upper hoist-side corner to the lower fly-side corner, into a lower black and an upper red triangle. On the hoist side of the lower black triangle is a representation of the Southern Cross constellation made up of one small and four larger five-pointed white stars. A golden Raggiana bird-of-paradise is situated on the fly side of the upper red triangle."},"name":{"common":"Papua New Guinea","official":"Independent State of Papua New Guinea","nativeName":{"eng":{"official":"Independent State of Papua New Guinea","common":"Papua New Guinea"},"hmo":{"official":"Independen Stet bilong Papua Niugini","common":"Papua Niu Gini"},"tpi":{"official":"Independen Stet bilong Papua Niugini","common":"Papua Niugini"}}},"cca3":"PNG"},{"flags":{"png":"https://flagcdn.com/w320/td.png","svg":"https://flagcdn.com/td.svg","alt":"The flag of Chad is composed of three equal vertical bands of blue, gold and red."},"name":{"common":"Chad","official":"Republic of Chad","nativeName":{"ara":{"official":"جمهورية تشاد","common":"تشاد‎"},"fra":{"official":"République du Tchad","common":"Tchad"}}},"cca3":"TCD"},{"flags":{"png":"https://flagcdn.com/w320/cl.png","svg":"https://flagcdn.com/cl.svg","alt":"The flag of Chile is composed of two equal horizontal bands of white and red, with a blue square of the same height as the white band superimposed in the canton. A white five-pointed star is centered in the blue square."},"name":{"common":"Chile","official":"Republic of Chile","nativeName":{"spa":{"official":"República de Chile","common":"Chile"}}},"cca3":"CHL"},{"flags":{"png":"https://flagcdn.com/w320/pr.png","svg":"https://flagcdn.com/pr.svg","alt":""},"name":{"common":"Puerto Rico","official":"Commonwealth of Puerto Rico","nativeName":{"eng":{"official":"Commonwealth of Puerto Rico","common":"Puerto Rico"},"spa":{"official":"Estado Libre Asociado de Puerto Rico","common":"Puerto Rico"}}},"cca3":"PRI"},{"flags":{"png":"https://flagcdn.com/w320/sa.png","svg":"https://flagcdn.com/sa.svg","alt":"The flag of Saudi Arabia has a green field, at the center of which is an Arabic inscription — the Shahada — in white above a white horizontal sabre with its tip pointed to the hoist side of the field."},"name":{"common":"Saudi Arabia","official":"Kingdom of Saudi Arabia","nativeName":{"ara":{"official":"المملكة العربية السعودية","common":"العربية السعودية"}}},"cca3":"SAU"},{"flags":{"png":"https://flagcdn.com/w320/no.png","svg":"https://flagcdn.com/no.svg","alt":"The flag of Norway has a red field with a large white-edged navy blue cross that extends to the edges of the field. The vertical part of this cross is offset towards the hoist side."},"name":{"common":"Norway","official":"Kingdom of Norway","nativeName":{"nno":{"official":"Kongeriket Noreg","common":"Noreg"},"nob":{"official":"Kongeriket Norge","common":"Norge"},"smi":{"official":"Norgga gonagasriika","common":"Norgga"}}},"cca3":"NOR"},{"flags":{"png":"https://flagcdn.com/w320/gm.png","svg":"https://flagcdn.com/gm.svg","alt":"The flag of Gambia is composed of three equal horizontal bands of red, blue with white top and bottom edges, and green."},"name":{"common":"Gambia","official":"Republic of the Gambia","nativeName":{"eng":{"official":"Republic of the Gambia","common":"Gambia"}}},"cca3":"GMB"},{"flags":{"png":"https://flagcdn.com/w320/ph.png","svg":"https://flagcdn.com/ph.svg","alt":"The flag of Philippines is composed of two equal horizontal bands of blue and red, with a white equilateral triangle superimposed on the hoist side of the field. This triangle has its base on the hoist end, spans about two-fifth the width of the field and bears a central golden-yellow sun with eight rays and a five-pointed golden-yellow star at each vertex."},"name":{"common":"Philippines","official":"Republic of the Philippines","nativeName":{"eng":{"official":"Republic of the Philippines","common":"Philippines"},"fil":{"official":"Republic of the Philippines","common":"Pilipinas"}}},"cca3":"PHL"},{"flags":{"png":"https://flagcdn.com/w320/im.png","svg":"https://flagcdn.com/im.svg","alt":""},"name":{"common":"Isle of Man","official":"Isle of Man","nativeName":{"eng":{"official":"Isle of Man","common":"Isle of Man"},"glv":{"official":"Ellan Vannin or Mannin","common":"Mannin"}}},"cca3":"IMN"},{"flags":{"png":"https://flagcdn.com/w320/pt.png","svg":"https://flagcdn.com/pt.svg","alt":"The flag of Portugal is composed of two vertical bands of green and red in the ratio of 2:3, with the coat of arms of Portugal centered over the two-color boundary."},"name":{"common":"Portugal","official":"Portuguese Republic","nativeName":{"por":{"official":"República português","common":"Portugal"}}},"cca3":"PRT"},{"flags":{"png":"https://flagcdn.com/w320/hn.png","svg":"https://flagcdn.com/hn.svg","alt":"The flag of Honduras is composed of three equal horizontal bands of turquoise, white and turquoise, with five small five-pointed turquoise stars arranged in a quincuncial pattern at the center of the white band."},"name":{"common":"Honduras","official":"Republic of Honduras","nativeName":{"spa":{"official":"República de Honduras","common":"Honduras"}}},"cca3":"HND"},{"flags":{"png":"https://flagcdn.com/w320/cy.png","svg":"https://flagcdn.com/cy.svg","alt":"The flag of Cyprus has a white field, at the center of which is a copper-colored silhouette of the Island of Cyprus above two green olive branches crossed at the stem."},"name":{"common":"Cyprus","official":"Republic of Cyprus","nativeName":{"ell":{"official":"Δημοκρατία της Κύπρος","common":"Κύπρος"},"tur":{"official":"Kıbrıs Cumhuriyeti","common":"Kıbrıs"}}},"cca3":"CYP"},{"flags":{"png":"https://flagcdn.com/w320/ai.png","svg":"https://flagcdn.com/ai.svg","alt":""},"name":{"common":"Anguilla","official":"Anguilla","nativeName":{"eng":{"official":"Anguilla","common":"Anguilla"}}},"cca3":"AIA"},{"flags":{"png":"https://flagcdn.com/w320/hm.png","svg":"https://flagcdn.com/hm.svg","alt":""},"name":{"common":"Heard Island and McDonald Islands","official":"Heard Island and McDonald Islands","nativeName":{"eng":{"official":"Heard Island and McDonald Islands","common":"Heard Island and McDonald Islands"}}},"cca3":"HMD"},{"flags":{"png":"https://flagcdn.com/w320/tg.png","svg":"https://flagcdn.com/tg.svg","alt":"The flag of Togo is composed of five equal horizontal bands of green alternating with yellow. A red square bearing a five-pointed white star is superimposed in the canton."},"name":{"common":"Togo","official":"Togolese Republic","nativeName":{"fra":{"official":"République togolaise","common":"Togo"}}},"cca3":"TGO"},{"flags":{"png":"https://flagcdn.com/w320/lb.png","svg":"https://flagcdn.com/lb.svg","alt":"The flag of Lebanon is composed of three horizontal bands of red, white and red. The white band is twice the height of the red bands and bears a green Lebanese Cedar tree at its center."},"name":{"common":"Lebanon","official":"Lebanese Republic","nativeName":{"ara":{"official":"الجمهورية اللبنانية","common":"لبنان"},"fra":{"official":"République libanaise","common":"Liban"}}},"cca3":"LBN"},{"flags":{"png":"https://flagcdn.com/w320/ma.png","svg":"https://flagcdn.com/ma.svg","alt":"The flag of Morocco features a green pentagram — a five-pointed linear star — centered on a red field."},"name":{"common":"Morocco","official":"Kingdom of Morocco","nativeName":{"ara":{"official":"المملكة المغربية","common":"المغرب"},"ber":{"official":"ⵜⴰⴳⵍⴷⵉⵜ ⵏ ⵍⵎⵖⵔⵉⴱ","common":"ⵍⵎⴰⵖⵔⵉⴱ"}}},"cca3":"MAR"},{"flags":{"png":"https://flagcdn.com/w320/ee.png","svg":"https://flagcdn.com/ee.svg","alt":"The flag of Estonia is composed of three equal horizontal bands of blue, black and white."},"name":{"common":"Estonia","official":"Republic of Estonia","nativeName":{"est":{"official":"Eesti Vabariik","common":"Eesti"}}},"cca3":"EST"},{"flags":{"png":"https://flagcdn.com/w320/fo.png","svg":"https://flagcdn.com/fo.svg","alt":""},"name":{"common":"Faroe Islands","official":"Faroe Islands","nativeName":{"dan":{"official":"Færøerne","common":"Færøerne"},"fao":{"official":"Føroyar","common":"Føroyar"}}},"cca3":"FRO"},{"flags":{"png":"https://flagcdn.com/w320/ar.png","svg":"https://flagcdn.com/ar.svg","alt":"The flag of Argentina features three equal horizontal bands of light blue, white and light blue. A brown-edged golden sun is centered in the white band."},"name":{"common":"Argentina","official":"Argentine Republic","nativeName":{"grn":{"official":"Argentine Republic","common":"Argentina"},"spa":{"official":"República Argentina","common":"Argentina"}}},"cca3":"ARG"},{"flags":{"png":"https://flagcdn.com/w320/ga.png","svg":"https://flagcdn.com/ga.svg","alt":"The flag of Gabon is composed of three equal horizontal bands of green, yellow and blue."},"name":{"common":"Gabon","official":"Gabonese Republic","nativeName":{"fra":{"official":"République gabonaise","common":"Gabon"}}},"cca3":"GAB"},{"flags":{"png":"https://flagcdn.com/w320/na.png","svg":"https://flagcdn.com/na.svg","alt":"The flag of Namibia features a white-edged red diagonal band that extends from the lower hoist-side corner to the upper fly-side corner of the field. Above and beneath this band are a blue and green triangle respectively. A gold sun with twelve triangular rays is situated on the hoist side of the upper triangle."},"name":{"common":"Namibia","official":"Republic of Namibia","nativeName":{"afr":{"official":"Republiek van Namibië","common":"Namibië"},"deu":{"official":"Republik Namibia","common":"Namibia"},"eng":{"official":"Republic of Namibia","common":"Namibia"},"her":{"official":"Republic of Namibia","common":"Namibia"},"hgm":{"official":"Republic of Namibia","common":"Namibia"},"kwn":{"official":"Republic of Namibia","common":"Namibia"},"loz":{"official":"Republic of Namibia","common":"Namibia"},"ndo":{"official":"Republic of Namibia","common":"Namibia"},"tsn":{"official":"Lefatshe la Namibia","common":"Namibia"}}},"cca3":"NAM"},{"flags":{"png":"https://flagcdn.com/w320/vn.png","svg":"https://flagcdn.com/vn.svg","alt":"The flag of Vietnam features a large five-pointed yellow star on a red field."},"name":{"common":"Vietnam","official":"Socialist Republic of Vietnam","nativeName":{"vie":{"official":"Cộng hòa xã hội chủ nghĩa Việt Nam","common":"Việt Nam"}}},"cca3":"VNM"},{"flags":{"png":"https://flagcdn.com/w320/gr.png","svg":"https://flagcdn.com/gr.svg","alt":"The flag of Greece is composed of nine equal horizontal bands of blue alternating with white. A blue square bearing a white cross is superimposed in the canton."},"name":{"common":"Greece","official":"Hellenic Republic","nativeName":{"ell":{"official":"Ελληνική Δημοκρατία","common":"Ελλάδα"}}},"cca3":"GRC"},{"flags":{"png":"https://flagcdn.com/w320/vg.png","svg":"https://flagcdn.com/vg.svg","alt":""},"name":{"common":"British Virgin Islands","official":"Virgin Islands","nativeName":{"eng":{"official":"Virgin Islands","common":"British Virgin Islands"}}},"cca3":"VGB"},{"flags":{"png":"https://flagcdn.com/w320/mz.png","svg":"https://flagcdn.com/mz.svg","alt":"The flag of Mozambique is composed of three equal horizontal bands of teal, black with white top and bottom edges, and yellow. A red isosceles triangle spanning about two-fifth the width of the field is superimposed on the hoist side with its base on the hoist end. This triangle bears a crossed rifle and hoe in black superimposed on an open white book which is superimposed on a five-pointed yellow star."},"name":{"common":"Mozambique","official":"Republic of Mozambique","nativeName":{"por":{"official":"República de Moçambique","common":"Moçambique"}}},"cca3":"MOZ"},{"flags":{"png":"https://flagcdn.com/w320/nf.png","svg":"https://flagcdn.com/nf.svg","alt":""},"name":{"common":"Norfolk Island","official":"Territory of Norfolk Island","nativeName":{"eng":{"official":"Territory of Norfolk Island","common":"Norfolk Island"},"pih":{"official":"Teratri of Norf'k Ailen","common":"Norf'k Ailen"}}},"cca3":"NFK"},{"flags":{"png":"https://flagcdn.com/w320/gs.png","svg":"https://flagcdn.com/gs.svg","alt":""},"name":{"common":"South Georgia","official":"South Georgia and the South Sandwich Islands","nativeName":{"eng":{"official":"South Georgia and the South Sandwich Islands","common":"South Georgia"}}},"cca3":"SGS"},{"flags":{"png":"https://flagcdn.com/w320/am.png","svg":"https://flagcdn.com/am.svg","alt":"The flag of Armenia is composed of three equal horizontal bands of red, blue and orange."},"name":{"common":"Armenia","official":"Republic of Armenia","nativeName":{"hye":{"official":"Հայաստանի Հանրապետություն","common":"Հայաստան"}}},"cca3":"ARM"},{"flags":{"png":"https://flagcdn.com/w320/ke.png","svg":"https://flagcdn.com/ke.svg","alt":"The flag of Kenya is composed of three equal horizontal bands of black, red with white top and bottom edges, and green. An emblem comprising a red, black and white Maasai shield covering two crossed white spears is superimposed at the center of the field."},"name":{"common":"Kenya","official":"Republic of Kenya","nativeName":{"eng":{"official":"Republic of Kenya","common":"Kenya"},"swa":{"official":"Republic of Kenya","common":"Kenya"}}},"cca3":"KEN"},{"flags":{"png":"https://flagcdn.com/w320/bt.png","svg":"https://flagcdn.com/bt.svg","alt":"The flag of Bhutan is divided diagonally, from the lower hoist-side corner to the upper fly-side corner, into an upper yellow and a lower orange triangle. A fly-side facing white dragon holding four jewels in its claws is situated along the boundary of the two triangles."},"name":{"common":"Bhutan","official":"Kingdom of Bhutan","nativeName":{"dzo":{"official":"འབྲུག་རྒྱལ་ཁབ་","common":"འབྲུག་ཡུལ་"}}},"cca3":"BTN"},{"flags":{"png":"https://flagcdn.com/w320/ae.png","svg":"https://flagcdn.com/ae.svg","alt":"The flag of United Arab Emirates features a red vertical band on its hoist side that takes up about one-fourth the width of the field and three equal horizontal bands of green, white and black adjoining the vertical band."},"name":{"common":"United Arab Emirates","official":"United Arab Emirates","nativeName":{"ara":{"official":"الإمارات العربية المتحدة","common":"دولة الإمارات العربية المتحدة"}}},"cca3":"ARE"},{"flags":{"png":"https://flagcdn.com/w320/ck.png","svg":"https://flagcdn.com/ck.svg","alt":""},"name":{"common":"Cook Islands","official":"Cook Islands","nativeName":{"eng":{"official":"Cook Islands","common":"Cook Islands"},"rar":{"official":"Kūki 'Āirani","common":"Kūki 'Āirani"}}},"cca3":"COK"},{"flags":{"png":"https://flagcdn.com/w320/et.png","svg":"https://flagcdn.com/et.svg","alt":"The flag of Ethiopia is composed of three equal horizontal bands of green, yellow and red, with the national emblem superimposed at the center of the field. The national emblem comprises a light blue circle bearing a golden-yellow pentagram with single yellow rays emanating from the angles between the points of the pentagram."},"name":{"common":"Ethiopia","official":"Federal Democratic Republic of Ethiopia","nativeName":{"amh":{"official":"የኢትዮጵያ ፌዴራላዊ ዲሞክራሲያዊ ሪፐብሊክ","common":"ኢትዮጵያ"}}},"cca3":"ETH"},{"flags":{"png":"https://flagcdn.com/w320/sg.png","svg":"https://flagcdn.com/sg.svg","alt":"The flag of Singapore is composed of two equal horizontal bands of red and white. On the hoist side of the red band is a fly-side facing white crescent which partially encloses five small five-pointed white stars arranged in the shape of a pentagon."},"name":{"common":"Singapore","official":"Republic of Singapore","nativeName":{"zho":{"official":"新加坡共和国","common":"新加坡"},"eng":{"official":"Republic of Singapore","common":"Singapore"},"msa":{"official":"Republik Singapura","common":"Singapura"},"tam":{"official":"சிங்கப்பூர் குடியரசு","common":"சிங்கப்பூர்"}}},"cca3":"SGP"},{"flags":{"png":"https://flagcdn.com/w320/pe.png","svg":"https://flagcdn.com/pe.svg","alt":"The flag of Peru is composed of three equal vertical bands of red, white and red, with the national emblem centered in the white band."},"name":{"common":"Peru","official":"Republic of Peru","nativeName":{"aym":{"official":"Piruw Suyu","common":"Piruw"},"que":{"official":"Piruw Ripuwlika","common":"Piruw"},"spa":{"official":"República del Perú","common":"Perú"}}},"cca3":"PER"},{"flags":{"png":"https://flagcdn.com/w320/ps.png","svg":"https://flagcdn.com/ps.svg","alt":""},"name":{"common":"Palestine","official":"State of Palestine","nativeName":{"ara":{"official":"دولة فلسطين","common":"فلسطين"}}},"cca3":"PSE"},{"flags":{"png":"https://flagcdn.com/w320/ws.png","svg":"https://flagcdn.com/ws.svg","alt":"The flag of Samoa has a red field. A blue rectangle, bearing a representation of the Southern Cross made up of five large and one smaller five-pointed white stars, is superimposed in the canton."},"name":{"common":"Samoa","official":"Independent State of Samoa","nativeName":{"eng":{"official":"Independent State of Samoa","common":"Samoa"},"smo":{"official":"Malo Saʻoloto Tutoʻatasi o Sāmoa","common":"Sāmoa"}}},"cca3":"WSM"},{"flags":{"png":"https://flagcdn.com/w320/ss.png","svg":"https://flagcdn.com/ss.svg","alt":"The flag of South Sudan is composed of three equal horizontal bands of black, red with white top and bottom edges, and green. A blue equilateral triangle which spans about two-fifth the width of the field is superimposed on the hoist side with its base on the hoist end of the field. At the center of this triangle is a five-pointed yellow star."},"name":{"common":"South Sudan","official":"Republic of South Sudan","nativeName":{"eng":{"official":"Republic of South Sudan","common":"South Sudan"}}},"cca3":"SSD"},{"flags":{"png":"https://flagcdn.com/w320/ad.png","svg":"https://flagcdn.com/ad.svg","alt":"The flag of Andorra features three equal vertical bands of blue, yellow and red, with the coat of arms of Andorra centered in the yellow band."},"name":{"common":"Andorra","official":"Principality of Andorra","nativeName":{"cat":{"official":"Principat d'Andorra","common":"Andorra"}}},"cca3":"AND"},{"flags":{"png":"https://flagcdn.com/w320/mf.png","svg":"https://flagcdn.com/mf.svg","alt":""},"name":{"common":"Saint Martin","official":"Saint Martin","nativeName":{"fra":{"official":"Saint-Martin","common":"Saint-Martin"}}},"cca3":"MAF"},{"flags":{"png":"https://flagcdn.com/w320/sz.png","svg":"https://flagcdn.com/sz.svg","alt":"The flag of Eswatini is composed of three horizontal bands — a large central yellow-edged red band, and a light blue band above and beneath the red band. The red band is three times the height of the blue bands and bears a centered emblem made up of a large black and white Nguni shield covering two spears and a staff decorated with feather tassels, all placed horizontally."},"name":{"common":"Eswatini","official":"Kingdom of Eswatini","nativeName":{"eng":{"official":"Kingdom of Eswatini","common":"Eswatini"},"ssw":{"official":"Umbuso weSwatini","common":"eSwatini"}}},"cca3":"SWZ"},{"flags":{"png":"https://flagcdn.com/w320/tj.png","svg":"https://flagcdn.com/tj.svg","alt":"The flag of Tajikistan is composed of three horizontal bands of red, white and green in the ratio of 2:3:2. A golden-yellow crown surmounted by an arc of seven five-pointed golden-yellow stars is centered in the white band."},"name":{"common":"Tajikistan","official":"Republic of Tajikistan","nativeName":{"rus":{"official":"Республика Таджикистан","common":"Таджикистан"},"tgk":{"official":"Ҷумҳурии Тоҷикистон","common":"Тоҷикистон"}}},"cca3":"TJK"},{"flags":{"png":"https://flagcdn.com/w320/zm.png","svg":"https://flagcdn.com/zm.svg","alt":"The flag of Zambia has a green field, on the fly side of which is a soaring orange African fish eagle above a rectangular area divided into three equal vertical bands of red, black and orange."},"name":{"common":"Zambia","official":"Republic of Zambia","nativeName":{"eng":{"official":"Republic of Zambia","common":"Zambia"}}},"cca3":"ZMB"},{"flags":{"png":"https://flagcdn.com/w320/us.png","svg":"https://flagcdn.com/us.svg","alt":"The flag of the United States of America is composed of thirteen equal horizontal bands of red alternating with white. A blue rectangle, bearing fifty small five-pointed white stars arranged in nine rows where rows of six stars alternate with rows of five stars, is superimposed in the canton."},"name":{"common":"United States","official":"United States of America","nativeName":{"eng":{"official":"United States of America","common":"United States"}}},"cca3":"USA"},{"flags":{"png":"https://flagcdn.com/w320/bi.png","svg":"https://flagcdn.com/bi.svg","alt":"The flag of Burundi is divided by a white diagonal cross into four alternating triangular areas of red at the top and bottom, and green on the hoist and fly sides. A white circle, with three green-edged red six-pointed stars arranged to form a triangle, is superimposed at the center of the cross."},"name":{"common":"Burundi","official":"Republic of Burundi","nativeName":{"fra":{"official":"République du Burundi","common":"Burundi"},"run":{"official":"Republika y'Uburundi ","common":"Uburundi"}}},"cca3":"BDI"},{"flags":{"png":"https://flagcdn.com/w320/jp.png","svg":"https://flagcdn.com/jp.svg","alt":"The flag of Japan features a crimson-red circle at the center of a white field."},"name":{"common":"Japan","official":"Japan","nativeName":{"jpn":{"official":"日本","common":"日本"}}},"cca3":"JPN"},{"flags":{"png":"https://flagcdn.com/w320/cw.png","svg":"https://flagcdn.com/cw.svg","alt":""},"name":{"common":"Curaçao","official":"Country of Curaçao","nativeName":{"eng":{"official":"Country of Curaçao","common":"Curaçao"},"nld":{"official":"Land Curaçao","common":"Curaçao"},"pap":{"official":"Pais Kòrsou","common":"Pais Kòrsou"}}},"cca3":"CUW"},{"flags":{"png":"https://flagcdn.com/w320/ug.png","svg":"https://flagcdn.com/ug.svg","alt":"The flag of Uganda is composed of six equal horizontal bands of black, yellow, red, black, yellow and red. A white circle bearing a hoist-side facing grey red-crested crane is superimposed in the center of the field."},"name":{"common":"Uganda","official":"Republic of Uganda","nativeName":{"eng":{"official":"Republic of Uganda","common":"Uganda"},"swa":{"official":"Republic of Uganda","common":"Uganda"}}},"cca3":"UGA"},{"flags":{"png":"https://flagcdn.com/w320/mn.png","svg":"https://flagcdn.com/mn.svg","alt":"The flag of Mongolia is composed of three equal vertical bands of red, blue and red, with the national emblem — the Soyombo — in gold centered in the hoist-side red band."},"name":{"common":"Mongolia","official":"Mongolia","nativeName":{"mon":{"official":"Монгол улс","common":"Монгол улс"}}},"cca3":"MNG"},{"flags":{"png":"https://flagcdn.com/w320/ng.png","svg":"https://flagcdn.com/ng.svg","alt":"The flag of Nigeria is composed of three equal vertical bands of green, white and green."},"name":{"common":"Nigeria","official":"Federal Republic of Nigeria","nativeName":{"eng":{"official":"Federal Republic of Nigeria","common":"Nigeria"}}},"cca3":"NGA"},{"flags":{"png":"https://flagcdn.com/w320/gt.png","svg":"https://flagcdn.com/gt.svg","alt":"The flag of Guatemala is composed of three equal vertical bands of light blue, white and light blue, with the national coat of arms centered in the white band."},"name":{"common":"Guatemala","official":"Republic of Guatemala","nativeName":{"spa":{"official":"República de Guatemala","common":"Guatemala"}}},"cca3":"GTM"},{"flags":{"png":"https://flagcdn.com/w320/je.png","svg":"https://flagcdn.com/je.svg","alt":""},"name":{"common":"Jersey","official":"Bailiwick of Jersey","nativeName":{"eng":{"official":"Bailiwick of Jersey","common":"Jersey"},"fra":{"official":"Bailliage de Jersey","common":"Jersey"},"nrf":{"official":"Bailliage dé Jèrri","common":"Jèrri"}}},"cca3":"JEY"},{"flags":{"png":"https://flagcdn.com/w320/cr.png","svg":"https://flagcdn.com/cr.svg","alt":"The flag of Costa Rica is composed of five horizontal bands of blue, white, red, white and blue. The central red band is twice the height of the other four bands."},"name":{"common":"Costa Rica","official":"Republic of Costa Rica","nativeName":{"spa":{"official":"República de Costa Rica","common":"Costa Rica"}}},"cca3":"CRI"},{"flags":{"png":"https://flagcdn.com/w320/ye.png","svg":"https://flagcdn.com/ye.svg","alt":"The flag of Yemen is composed of three equal horizontal bands of red, white and black."},"name":{"common":"Yemen","official":"Republic of Yemen","nativeName":{"ara":{"official":"الجمهورية اليمنية","common":"اليَمَن"}}},"cca3":"YEM"},{"flags":{"png":"https://flagcdn.com/w320/gl.png","svg":"https://flagcdn.com/gl.svg","alt":""},"name":{"common":"Greenland","official":"Greenland","nativeName":{"kal":{"official":"Kalaallit Nunaat","common":"Kalaallit Nunaat"}}},"cca3":"GRL"},{"flags":{"png":"https://flagcdn.com/w320/mg.png","svg":"https://flagcdn.com/mg.svg","alt":"The flag of Madagascar features a white vertical band on the hoist side that takes up about one-third the width of the field, and two equal horizontal bands of red and green adjoining the vertical band."},"name":{"common":"Madagascar","official":"Republic of Madagascar","nativeName":{"fra":{"official":"République de Madagascar","common":"Madagascar"},"mlg":{"official":"Repoblikan'i Madagasikara","common":"Madagasikara"}}},"cca3":"MDG"},{"flags":{"png":"https://flagcdn.com/w320/dz.png","svg":"https://flagcdn.com/dz.svg","alt":"The flag of Algeria features two equal vertical bands of green and white. A five-pointed red star within a fly-side facing red crescent is centered over the two-color boundary."},"name":{"common":"Algeria","official":"People's Democratic Republic of Algeria","nativeName":{"ara":{"official":"الجمهورية الديمقراطية الشعبية الجزائرية","common":"الجزائر"}}},"cca3":"DZA"},{"flags":{"png":"https://flagcdn.com/w320/be.png","svg":"https://flagcdn.com/be.svg","alt":"The flag of Belgium is composed of three equal vertical bands of black, yellow and red."},"name":{"common":"Belgium","official":"Kingdom of Belgium","nativeName":{"deu":{"official":"Königreich Belgien","common":"Belgien"},"fra":{"official":"Royaume de Belgique","common":"Belgique"},"nld":{"official":"Koninkrijk België","common":"België"}}},"cca3":"BEL"},{"flags":{"png":"https://flagcdn.com/w320/lk.png","svg":"https://flagcdn.com/lk.svg","alt":"The flag of Sri Lanka features two large adjacent but separate rectangular areas, centered on a golden-yellow field. The smaller hoist-side rectangle is divided into two equal vertical bands of teal and orange, and the larger fly-side rectangle is maroon with a centered golden-yellow lion holding a Kastane sword in its right fore-paw and four golden-yellow Bo leaves, one in each corner."},"name":{"common":"Sri Lanka","official":"Democratic Socialist Republic of Sri Lanka","nativeName":{"sin":{"official":"ශ්‍රී ලංකා ප්‍රජාතාන්ත්‍රික සමාජවාදී ජනරජය","common":"ශ්‍රී ලංකාව"},"tam":{"official":"இலங்கை சனநாயக சோசலிசக் குடியரசு","common":"இலங்கை"}}},"cca3":"LKA"},{"flags":{"png":"https://flagcdn.com/w320/fi.png","svg":"https://flagcdn.com/fi.svg","alt":"The flag of Finland has a white field with a large blue cross that extend to the edges of the field. The vertical part of this cross is offset towards the hoist side."},"name":{"common":"Finland","official":"Republic of Finland","nativeName":{"fin":{"official":"Suomen tasavalta","common":"Suomi"},"swe":{"official":"Republiken Finland","common":"Finland"}}},"cca3":"FIN"},{"flags":{"png":"https://flagcdn.com/w320/bm.png","svg":"https://flagcdn.com/bm.svg","alt":""},"name":{"common":"Bermuda","official":"Bermuda","nativeName":{"eng":{"official":"Bermuda","common":"Bermuda"}}},"cca3":"BMU"},{"flags":{"png":"https://flagcdn.com/w320/mk.png","svg":"https://flagcdn.com/mk.svg","alt":"The flag of North Macedonia has a red field, at the center of which is a golden-yellow sun with eight broadening rays that extend to the edges of the field."},"name":{"common":"North Macedonia","official":"Republic of North Macedonia","nativeName":{"mkd":{"official":"Република Северна Македонија","common":"Македонија"}}},"cca3":"MKD"},{"flags":{"png":"https://flagcdn.com/w320/vc.png","svg":"https://flagcdn.com/vc.svg","alt":"The flag of Saint Vincent and the Grenadines is composed of three vertical bands of blue, gold and green. The gold band is twice as wide as the other two bands and bears three green diamonds arranged to form the letter V at its center."},"name":{"common":"Saint Vincent and the Grenadines","official":"Saint Vincent and the Grenadines","nativeName":{"eng":{"official":"Saint Vincent and the Grenadines","common":"Saint Vincent and the Grenadines"}}},"cca3":"VCT"},{"flags":{"png":"https://flagcdn.com/w320/ne.png","svg":"https://flagcdn.com/ne.svg","alt":"The flag of Niger features three equal horizontal bands of orange, white and green, with an orange circle centered in the white band."},"name":{"common":"Niger","official":"Republic of Niger","nativeName":{"fra":{"official":"République du Niger","common":"Niger"}}},"cca3":"NER"},{"flags":{"png":"https://flagcdn.com/w320/io.png","svg":"https://flagcdn.com/io.svg","alt":""},"name":{"common":"British Indian Ocean Territory","official":"British Indian Ocean Territory","nativeName":{"eng":{"official":"British Indian Ocean Territory","common":"British Indian Ocean Territory"}}},"cca3":"IOT"},{"flags":{"png":"https://flagcdn.com/w320/lv.png","svg":"https://flagcdn.com/lv.svg","alt":"The flag of Latvia has a carmine-red field with a thin white horizontal band across the middle of the field."},"name":{"common":"Latvia","official":"Republic of Latvia","nativeName":{"lav":{"official":"Latvijas Republikas","common":"Latvija"}}},"cca3":"LVA"},{"flags":{"png":"https://flagcdn.com/w320/np.png","svg":"https://flagcdn.com/np.svg","alt":"The flag of Nepal is the world's only non-quadrilateral flag of a sovereign country. It takes the shape of two adjoining right-angled triangles and has a crimson red field with deep blue edges. Within the smaller upper triangle is an emblem of the upper half of a white sun resting on an upward facing white crescent. The lower triangle bears a white sun with twelve rays."},"name":{"common":"Nepal","official":"Federal Democratic Republic of Nepal","nativeName":{"nep":{"official":"नेपाल संघीय लोकतान्त्रिक गणतन्त्र","common":"नेपाल"}}},"cca3":"NPL"},{"flags":{"png":"https://flagcdn.com/w320/ci.png","svg":"https://flagcdn.com/ci.svg","alt":"The flag of Ivory Coast is composed of three equal vertical bands of orange, white and green."},"name":{"common":"Ivory Coast","official":"Republic of Côte d'Ivoire","nativeName":{"fra":{"official":"République de Côte d'Ivoire","common":"Côte d'Ivoire"}}},"cca3":"CIV"},{"flags":{"png":"https://flagcdn.com/w320/li.png","svg":"https://flagcdn.com/li.svg","alt":"The flag of Liechtenstein is composed of two equal horizontal bands of blue and red, with a golden-yellow crown on the hoist side of the blue band."},"name":{"common":"Liechtenstein","official":"Principality of Liechtenstein","nativeName":{"deu":{"official":"Fürstentum Liechtenstein","common":"Liechtenstein"}}},"cca3":"LIE"},{"flags":{"png":"https://flagcdn.com/w320/cd.png","svg":"https://flagcdn.com/cd.svg","alt":"The flag of the Democratic Republic of the Congo has a sky-blue field with a yellow-edged red diagonal band that extends from the lower hoist-side corner to the upper fly-side corner of the field. A large five-pointed yellow star is situated above the diagonal band on the upper hoist side of the field."},"name":{"common":"DR Congo","official":"Democratic Republic of the Congo","nativeName":{"fra":{"official":"République démocratique du Congo","common":"RD Congo"},"kon":{"official":"Repubilika ya Kongo Demokratiki","common":"Repubilika ya Kongo Demokratiki"},"lin":{"official":"Republiki ya Kongó Demokratiki","common":"Republiki ya Kongó Demokratiki"},"lua":{"official":"Ditunga dia Kongu wa Mungalaata","common":"Ditunga dia Kongu wa Mungalaata"},"swa":{"official":"Jamhuri ya Kidemokrasia ya Kongo","common":"Jamhuri ya Kidemokrasia ya Kongo"}}},"cca3":"COD"},{"flags":{"png":"https://flagcdn.com/w320/bz.png","svg":"https://flagcdn.com/bz.svg","alt":"The flag of Belize has a royal blue field with a thin red horizontal band at the top and bottom of the field and the national coat of arms in the center."},"name":{"common":"Belize","official":"Belize","nativeName":{"bjz":{"official":"Belize","common":"Belize"},"eng":{"official":"Belize","common":"Belize"},"spa":{"official":"Belice","common":"Belice"}}},"cca3":"BLZ"},{"flags":{"png":"https://flagcdn.com/w320/qa.png","svg":"https://flagcdn.com/qa.svg","alt":"The flag of Qatar has a maroon field, on the hoist side of which is a white vertical band that spans about one-third the width of the field and is separated from the rest of the field by nine adjoining fly-side pointing white isosceles triangles that serve as a serrated line."},"name":{"common":"Qatar","official":"State of Qatar","nativeName":{"ara":{"official":"دولة قطر","common":"قطر"}}},"cca3":"QAT"},{"flags":{"png":"https://flagcdn.com/w320/tk.png","svg":"https://flagcdn.com/tk.svg","alt":""},"name":{"common":"Tokelau","official":"Tokelau","nativeName":{"eng":{"official":"Tokelau","common":"Tokelau"},"smo":{"official":"Tokelau","common":"Tokelau"},"tkl":{"official":"Tokelau","common":"Tokelau"}}},"cca3":"TKL"},{"flags":{"png":"https://flagcdn.com/w320/id.png","svg":"https://flagcdn.com/id.svg","alt":"The flag of Indonesia is composed of two equal horizontal bands of red and white."},"name":{"common":"Indonesia","official":"Republic of Indonesia","nativeName":{"ind":{"official":"Republik Indonesia","common":"Indonesia"}}},"cca3":"IDN"},{"flags":{"png":"https://flagcdn.com/w320/pf.png","svg":"https://flagcdn.com/pf.svg","alt":""},"name":{"common":"French Polynesia","official":"French Polynesia","nativeName":{"fra":{"official":"Polynésie française","common":"Polynésie française"}}},"cca3":"PYF"},{"flags":{"png":"https://flagcdn.com/w320/ls.png","svg":"https://flagcdn.com/ls.svg","alt":"The flag of Lesotho is composed of three horizontal bands of blue, white and green in the ratio of 3:4:3. A black mokorotlo — a Basotho hat — is centered in the white band."},"name":{"common":"Lesotho","official":"Kingdom of Lesotho","nativeName":{"eng":{"official":"Kingdom of Lesotho","common":"Lesotho"},"sot":{"official":"Kingdom of Lesotho","common":"Lesotho"}}},"cca3":"LSO"},{"flags":{"png":"https://flagcdn.com/w320/pl.png","svg":"https://flagcdn.com/pl.svg","alt":"The flag of Poland is composed of two equal horizontal bands of white and red."},"name":{"common":"Poland","official":"Republic of Poland","nativeName":{"pol":{"official":"Rzeczpospolita Polska","common":"Polska"}}},"cca3":"POL"},{"flags":{"png":"https://flagcdn.com/w320/pw.png","svg":"https://flagcdn.com/pw.svg","alt":"The flag of Palau has a light blue field with a large golden-yellow circle that is offset slightly towards the hoist side of center."},"name":{"common":"Palau","official":"Republic of Palau","nativeName":{"eng":{"official":"Republic of Palau","common":"Palau"},"pau":{"official":"Beluu er a Belau","common":"Belau"}}},"cca3":"PLW"},{"flags":{"png":"https://flagcdn.com/w320/gg.png","svg":"https://flagcdn.com/gg.svg","alt":""},"name":{"common":"Guernsey","official":"Bailiwick of Guernsey","nativeName":{"eng":{"official":"Bailiwick of Guernsey","common":"Guernsey"},"fra":{"official":"Bailliage de Guernesey","common":"Guernesey"},"nfr":{"official":"Dgèrnésiais","common":"Dgèrnésiais"}}},"cca3":"GGY"},{"flags":{"png":"https://flagcdn.com/w320/ag.png","svg":"https://flagcdn.com/ag.svg","alt":"The flag of Antigua and Barbuda has a red field with an inverted isosceles triangle based on the top edge and spanning the height of the field. This triangle has three horizontal bands of black, light blue and white, with the light blue band half the height of the two other bands. The top half of a golden-yellow sun is situated in the lower two-third of the black band to depict a rising sun."},"name":{"common":"Antigua and Barbuda","official":"Antigua and Barbuda","nativeName":{"eng":{"official":"Antigua and Barbuda","common":"Antigua and Barbuda"}}},"cca3":"ATG"},{"flags":{"png":"https://flagcdn.com/w320/pm.png","svg":"https://flagcdn.com/pm.svg","alt":""},"name":{"common":"Saint Pierre and Miquelon","official":"Saint Pierre and Miquelon","nativeName":{"fra":{"official":"Collectivité territoriale de Saint-Pierre-et-Miquelon","common":"Saint-Pierre-et-Miquelon"}}},"cca3":"SPM"},{"flags":{"png":"https://flagcdn.com/w320/xk.png","svg":"https://flagcdn.com/xk.svg","alt":""},"name":{"common":"Kosovo","official":"Republic of Kosovo","nativeName":{"sqi":{"official":"Republika e Kosovës","common":"Kosova"},"srp":{"official":"Република Косово","common":"Косово"}}},"cca3":"UNK"},{"flags":{"png":"https://flagcdn.com/w320/eh.png","svg":"https://flagcdn.com/eh.svg","alt":""},"name":{"common":"Western Sahara","official":"Sahrawi Arab Democratic Republic","nativeName":{"ber":{"official":"Sahrawi Arab Democratic Republic","common":"Western Sahara"},"mey":{"official":"الجمهورية العربية الصحراوية الديمقراطية","common":"الصحراء الغربية"},"spa":{"official":"República Árabe Saharaui Democrática","common":"Sahara Occidental"}}},"cca3":"ESH"},{"flags":{"png":"https://flagcdn.com/w320/lu.png","svg":"https://flagcdn.com/lu.svg","alt":"The flag of Luxembourg is composed of three equal horizontal bands of red, white and light blue."},"name":{"common":"Luxembourg","official":"Grand Duchy of Luxembourg","nativeName":{"deu":{"official":"Großherzogtum Luxemburg","common":"Luxemburg"},"fra":{"official":"Grand-Duché de Luxembourg","common":"Luxembourg"},"ltz":{"official":"Groussherzogtum Lëtzebuerg","common":"Lëtzebuerg"}}},"cca3":"LUX"},{"flags":{"png":"https://flagcdn.com/w320/tw.png","svg":"https://flagcdn.com/tw.svg","alt":""},"name":{"common":"Taiwan","official":"Republic of China (Taiwan)","nativeName":{"zho":{"official":"中華民國","common":"台灣"}}},"cca3":"TWN"},{"flags":{"png":"https://flagcdn.com/w320/hk.png","svg":"https://flagcdn.com/hk.svg","alt":""},"name":{"common":"Hong Kong","official":"Hong Kong Special Administrative Region of the People's Republic of China","nativeName":{"eng":{"official":"Hong Kong Special Administrative Region of the People's Republic of China","common":"Hong Kong"},"zho":{"official":"中华人民共和国香港特别行政区","common":"香港"}}},"cca3":"HKG"},{"flags":{"png":"https://flagcdn.com/w320/tm.png","svg":"https://flagcdn.com/tm.svg","alt":"The flag of Turkmenistan has a green field. It features a red vertical band, bearing five carpet guls stacked above two crossed olive branches, near the hoist end of the field. Just to the fly side of the vertical band near the top edge of the field is a hoist-side facing white crescent and five small five-pointed white stars placed just outside the crescent opening."},"name":{"common":"Turkmenistan","official":"Turkmenistan","nativeName":{"rus":{"official":"Туркменистан","common":"Туркмения"},"tuk":{"official":"Türkmenistan","common":"Türkmenistan"}}},"cca3":"TKM"},{"flags":{"png":"https://flagcdn.com/w320/ru.png","svg":"https://flagcdn.com/ru.svg","alt":"The flag of Russia is composed of three equal horizontal bands of white, blue and red."},"name":{"common":"Russia","official":"Russian Federation","nativeName":{"rus":{"official":"Российская Федерация","common":"Россия"}}},"cca3":"RUS"},{"flags":{"png":"https://flagcdn.com/w320/az.png","svg":"https://flagcdn.com/az.svg","alt":"The flag of Azerbaijan features three equal horizontal bands of blue, red and green, with a white fly-side facing crescent and eight-pointed star centered in the red band."},"name":{"common":"Azerbaijan","official":"Republic of Azerbaijan","nativeName":{"aze":{"official":"Azərbaycan Respublikası","common":"Azərbaycan"}}},"cca3":"AZE"},{"flags":{"png":"https://flagcdn.com/w320/ec.png","svg":"https://flagcdn.com/ec.svg","alt":"The flag of Ecuador is composed of the horizontal bands of yellow, blue and red, with the yellow band twice the height of the other two bands. The Ecuadorian coat of arms is superimposed in the center of the field."},"name":{"common":"Ecuador","official":"Republic of Ecuador","nativeName":{"spa":{"official":"República del Ecuador","common":"Ecuador"}}},"cca3":"ECU"},{"flags":{"png":"https://flagcdn.com/w320/kh.png","svg":"https://flagcdn.com/kh.svg","alt":"The flag of Cambodia features three horizontal bands of blue, red and blue, with a white depiction of the temple complex, Angkor Wat centered in the red band."},"name":{"common":"Cambodia","official":"Kingdom of Cambodia","nativeName":{"khm":{"official":"ព្រះរាជាណាចក្រកម្ពុជា","common":"Kâmpŭchéa"}}},"cca3":"KHM"},{"flags":{"png":"https://flagcdn.com/w320/yt.png","svg":"https://flagcdn.com/yt.svg","alt":""},"name":{"common":"Mayotte","official":"Department of Mayotte","nativeName":{"fra":{"official":"Département de Mayotte","common":"Mayotte"}}},"cca3":"MYT"},{"flags":{"png":"https://flagcdn.com/w320/bw.png","svg":"https://flagcdn.com/bw.svg","alt":"The flag of Botswana has a light blue field with a white-edged black horizontal band across its center."},"name":{"common":"Botswana","official":"Republic of Botswana","nativeName":{"eng":{"official":"Republic of Botswana","common":"Botswana"},"tsn":{"official":"Lefatshe la Botswana","common":"Botswana"}}},"cca3":"BWA"},{"flags":{"png":"https://flagcdn.com/w320/hr.png","svg":"https://flagcdn.com/hr.svg","alt":"The flag of Croatia is composed of three equal horizontal bands of red, white and blue, with coat of arms of Croatia superimposed in the center."},"name":{"common":"Croatia","official":"Republic of Croatia","nativeName":{"hrv":{"official":"Republika Hrvatska","common":"Hrvatska"}}},"cca3":"HRV"},{"flags":{"png":"https://flagcdn.com/w320/lc.png","svg":"https://flagcdn.com/lc.svg","alt":"The flag of Saint Lucia has a light blue field, at the center of which are two triangles which share a common base — a small golden-yellow isosceles triangle superimposed on a large white-edged black isosceles triangle."},"name":{"common":"Saint Lucia","official":"Saint Lucia","nativeName":{"eng":{"official":"Saint Lucia","common":"Saint Lucia"}}},"cca3":"LCA"},{"flags":{"png":"https://flagcdn.com/w320/py.png","svg":"https://flagcdn.com/py.svg","alt":"The flag of Paraguay features three equal horizontal bands of red, white and blue, with an emblem centered in the white band. On the obverse side of the flag depicted, this emblem is the national coat of arms."},"name":{"common":"Paraguay","official":"Republic of Paraguay","nativeName":{"grn":{"official":"Tetã Paraguái","common":"Paraguái"},"spa":{"official":"República de Paraguay","common":"Paraguay"}}},"cca3":"PRY"},{"flags":{"png":"https://flagcdn.com/w320/bo.png","svg":"https://flagcdn.com/bo.svg","alt":"The flag of Bolivia is composed of three equal horizontal bands of red, yellow and green, with the national coat of arms centered in the yellow band."},"name":{"common":"Bolivia","official":"Plurinational State of Bolivia","nativeName":{"aym":{"official":"Wuliwya Suyu","common":"Wuliwya"},"grn":{"official":"Tetã Volívia","common":"Volívia"},"que":{"official":"Buliwya Mamallaqta","common":"Buliwya"},"spa":{"official":"Estado Plurinacional de Bolivia","common":"Bolivia"}}},"cca3":"BOL"},{"flags":{"png":"https://flagcdn.com/w320/mv.png","svg":"https://flagcdn.com/mv.svg","alt":"The flag of Maldives has a red field, at the center of which is a large green rectangle bearing a fly-side facing white crescent."},"name":{"common":"Maldives","official":"Republic of the Maldives","nativeName":{"div":{"official":"ދިވެހިރާއްޖޭގެ ޖުމްހޫރިއްޔާ","common":"ދިވެހިރާއްޖޭގެ"}}},"cca3":"MDV"},{"flags":{"png":"https://flagcdn.com/w320/as.png","svg":"https://flagcdn.com/as.svg","alt":""},"name":{"common":"American Samoa","official":"American Samoa","nativeName":{"eng":{"official":"American Samoa","common":"American Samoa"},"smo":{"official":"Sāmoa Amelika","common":"Sāmoa Amelika"}}},"cca3":"ASM"},{"flags":{"png":"https://flagcdn.com/w320/is.png","svg":"https://flagcdn.com/is.svg","alt":"The flag of Iceland has a blue field with a large white-edged red cross that extends to the edges of the field. The vertical part of this cross is offset towards the hoist side."},"name":{"common":"Iceland","official":"Iceland","nativeName":{"isl":{"official":"Ísland","common":"Ísland"}}},"cca3":"ISL"},{"flags":{"png":"https://flagcdn.com/w320/sk.png","svg":"https://flagcdn.com/sk.svg","alt":"The flag of Slovakia is composed of three equal horizontal bands of white, blue and red. The coat of arms of Slovakia is superimposed at the center of the field slightly towards the hoist side."},"name":{"common":"Slovakia","official":"Slovak Republic","nativeName":{"slk":{"official":"Slovenská republika","common":"Slovensko"}}},"cca3":"SVK"},{"flags":{"png":"https://flagcdn.com/w320/tf.png","svg":"https://flagcdn.com/tf.svg","alt":""},"name":{"common":"French Southern and Antarctic Lands","official":"Territory of the French Southern and Antarctic Lands","nativeName":{"fra":{"official":"Territoire des Terres australes et antarctiques françaises","common":"Terres australes et antarctiques françaises"}}},"cca3":"ATF"},{"flags":{"png":"https://flagcdn.com/w320/bn.png","svg":"https://flagcdn.com/bn.svg","alt":"The flag of Brunei has a yellow field with two adjoining diagonal bands of white and black that extend from the upper hoist side of the field to the lower fly side. The red emblem of Brunei is centered on the field."},"name":{"common":"Brunei","official":"Nation of Brunei, Abode of Peace","nativeName":{"msa":{"official":"Nation of Brunei, Abode Damai","common":"Negara Brunei Darussalam"}}},"cca3":"BRN"},{"flags":{"png":"https://flagcdn.com/w320/kn.png","svg":"https://flagcdn.com/kn.svg","alt":"The flag of Saint Kitts and Nevis features two large five-pointed white stars within a yellow-edged black diagonal band that extends from the lower hoist-side corner to the upper fly-side corner of the field. Above and beneath this band are a green and red triangle respectively."},"name":{"common":"Saint Kitts and Nevis","official":"Federation of Saint Christopher and Nevis","nativeName":{"eng":{"official":"Federation of Saint Christopher and Nevis","common":"Saint Kitts and Nevis"}}},"cca3":"KNA"},{"flags":{"png":"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_the_Taliban.svg/320px-Flag_of_the_Taliban.svg.png","svg":"https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg","alt":"The flag of the Islamic Emirate of Afghanistan has a white field with Arabic inscriptions — the Shahada — in black across its center."},"name":{"common":"Afghanistan","official":"Islamic Republic of Afghanistan","nativeName":{"prs":{"official":"جمهوری اسلامی افغانستان","common":"افغانستان"},"pus":{"official":"د افغانستان اسلامي جمهوریت","common":"افغانستان"},"tuk":{"official":"Owganystan Yslam Respublikasy","common":"Owganystan"}}},"cca3":"AFG"},{"flags":{"png":"https://flagcdn.com/w320/gh.png","svg":"https://flagcdn.com/gh.svg","alt":"The flag of Ghana is composed of three equal horizontal bands of red, gold and green, with a five-pointed black star centered in the gold band."},"name":{"common":"Ghana","official":"Republic of Ghana","nativeName":{"eng":{"official":"Republic of Ghana","common":"Ghana"}}},"cca3":"GHA"},{"flags":{"png":"https://flagcdn.com/w320/kw.png","svg":"https://flagcdn.com/kw.svg","alt":"The flag of Kuwait is composed of three equal horizontal bands of green, white and red, with a black trapezium superimposed on the hoist side of the field. This trapezium has its base on the hoist end and spans about one-fourth the width of the field."},"name":{"common":"Kuwait","official":"State of Kuwait","nativeName":{"ara":{"official":"دولة الكويت","common":"الكويت"}}},"cca3":"KWT"},{"flags":{"png":"https://flagcdn.com/w320/sj.png","svg":"https://flagcdn.com/sj.svg","alt":""},"name":{"common":"Svalbard and Jan Mayen","official":"Svalbard og Jan Mayen","nativeName":{"nor":{"official":"Svalbard og Jan Mayen","common":"Svalbard og Jan Mayen"}}},"cca3":"SJM"},{"flags":{"png":"https://flagcdn.com/w320/bd.png","svg":"https://flagcdn.com/bd.svg","alt":"The flag of Bangladesh has a dark green field bearing a large red circle that is offset slightly towards the hoist side of center."},"name":{"common":"Bangladesh","official":"People's Republic of Bangladesh","nativeName":{"ben":{"official":"বাংলাদেশ গণপ্রজাতন্ত্রী","common":"বাংলাদেশ"}}},"cca3":"BGD"},{"flags":{"png":"https://flagcdn.com/w320/gy.png","svg":"https://flagcdn.com/gy.svg","alt":"The flag of Guyana has a green field with two isosceles triangles which share a common base on the hoist end. The smaller black-edged red triangle spanning half the width of the field is superimposed on the larger white-edged yellow triangle which spans the full width of the field."},"name":{"common":"Guyana","official":"Co-operative Republic of Guyana","nativeName":{"eng":{"official":"Co-operative Republic of Guyana","common":"Guyana"}}},"cca3":"GUY"},{"flags":{"png":"https://flagcdn.com/w320/ki.png","svg":"https://flagcdn.com/ki.svg","alt":"The flag of Kiribati is divided into two halves. While the upper half has a red field, at the center of which is a yellow frigate bird flying over the top half of a rising yellow sun with seventeen visible rays, the lower half is composed of six horizontal wavy bands of white alternating with blue to depict the ocean."},"name":{"common":"Kiribati","official":"Independent and Sovereign Republic of Kiribati","nativeName":{"eng":{"official":"Independent and Sovereign Republic of Kiribati","common":"Kiribati"},"gil":{"official":"Ribaberiki Kiribati","common":"Kiribati"}}},"cca3":"KIR"},{"flags":{"png":"https://flagcdn.com/w320/bb.png","svg":"https://flagcdn.com/bb.svg","alt":"The flag of Barbados is composed of three equal vertical bands of ultramarine, gold and ultramarine. The head of a black trident is centered in the gold band."},"name":{"common":"Barbados","official":"Barbados","nativeName":{"eng":{"official":"Barbados","common":"Barbados"}}},"cca3":"BRB"},{"flags":{"png":"https://flagcdn.com/w320/al.png","svg":"https://flagcdn.com/al.svg","alt":"The flag of Albania features a silhouetted double-headed black eagle at the center of a red field."},"name":{"common":"Albania","official":"Republic of Albania","nativeName":{"sqi":{"official":"Republika e Shqipërisë","common":"Shqipëria"}}},"cca3":"ALB"},{"flags":{"png":"https://flagcdn.com/w320/pn.png","svg":"https://flagcdn.com/pn.svg","alt":""},"name":{"common":"Pitcairn Islands","official":"Pitcairn Group of Islands","nativeName":{"eng":{"official":"Pitcairn Group of Islands","common":"Pitcairn Islands"}}},"cca3":"PCN"},{"flags":{"png":"https://flagcdn.com/w320/bf.png","svg":"https://flagcdn.com/bf.svg","alt":"The flag of Burkina Faso features two equal horizontal bands of red and green, with a yellow five-pointed star in the center."},"name":{"common":"Burkina Faso","official":"Burkina Faso","nativeName":{"fra":{"official":"République du Burkina","common":"Burkina Faso"}}},"cca3":"BFA"},{"flags":{"png":"https://flagcdn.com/w320/mo.png","svg":"https://flagcdn.com/mo.svg","alt":""},"name":{"common":"Macau","official":"Macao Special Administrative Region of the People's Republic of China","nativeName":{"por":{"official":"Região Administrativa Especial de Macau da República Popular da China","common":"Macau"},"zho":{"official":"中华人民共和国澳门特别行政区","common":"澳门"}}},"cca3":"MAC"},{"flags":{"png":"https://flagcdn.com/w320/sc.png","svg":"https://flagcdn.com/sc.svg","alt":"The flag of Seychelles is composed of five broadening oblique bands of blue, yellow, red, white and green, which extend from the hoist side of the bottom edge to the top and fly edges of the field."},"name":{"common":"Seychelles","official":"Republic of Seychelles","nativeName":{"crs":{"official":"Repiblik Sesel","common":"Sesel"},"eng":{"official":"Republic of Seychelles","common":"Seychelles"},"fra":{"official":"République des Seychelles","common":"Seychelles"}}},"cca3":"SYC"},{"flags":{"png":"https://flagcdn.com/w320/ch.png","svg":"https://flagcdn.com/ch.svg","alt":"The flag of Switzerland is square shaped. It features a white Swiss cross centered on a red field."},"name":{"common":"Switzerland","official":"Swiss Confederation","nativeName":{"fra":{"official":"Confédération suisse","common":"Suisse"},"gsw":{"official":"Schweizerische Eidgenossenschaft","common":"Schweiz"},"ita":{"official":"Confederazione Svizzera","common":"Svizzera"},"roh":{"official":"Confederaziun svizra","common":"Svizra"}}},"cca3":"CHE"},{"flags":{"png":"https://flagcdn.com/w320/kr.png","svg":"https://flagcdn.com/kr.svg","alt":"The flag of South Korea has a white field, at the center of which is a red and blue Taegeuk circle surrounded by four black trigrams, one in each corner."},"name":{"common":"South Korea","official":"Republic of Korea","nativeName":{"kor":{"official":"대한민국","common":"한국"}}},"cca3":"KOR"},{"flags":{"png":"https://flagcdn.com/w320/vi.png","svg":"https://flagcdn.com/vi.svg","alt":""},"name":{"common":"United States Virgin Islands","official":"Virgin Islands of the United States","nativeName":{"eng":{"official":"Virgin Islands of the United States","common":"United States Virgin Islands"}}},"cca3":"VIR"},{"flags":{"png":"https://flagcdn.com/w320/tn.png","svg":"https://flagcdn.com/tn.svg","alt":"The flag of Tunisia has a red field. A white circle bearing a five-pointed red star within a fly-side facing red crescent is situated at the center of the field."},"name":{"common":"Tunisia","official":"Tunisian Republic","nativeName":{"ara":{"official":"الجمهورية التونسية","common":"تونس"}}},"cca3":"TUN"},{"flags":{"png":"https://flagcdn.com/w320/bv.png","svg":"https://flagcdn.com/bv.svg","alt":""},"name":{"common":"Bouvet Island","official":"Bouvet Island","nativeName":{"nor":{"official":"Bouvetøya","common":"Bouvetøya"}}},"cca3":"BVT"},{"flags":{"png":"https://flagcdn.com/w320/ir.png","svg":"https://flagcdn.com/ir.svg","alt":"The flag of Iran is composed of three equal horizontal bands of green, white and red. A red emblem of Iran is centered in the white band and Arabic inscriptions in white span the bottom edge of the green band and the top edge of the red band."},"name":{"common":"Iran","official":"Islamic Republic of Iran","nativeName":{"fas":{"official":"جمهوری اسلامی ایران","common":"ایران"}}},"cca3":"IRN"},{"flags":{"png":"https://flagcdn.com/w320/jo.png","svg":"https://flagcdn.com/jo.svg","alt":"The flag of Jordan is composed of three equal horizontal bands of black, white and green, with a red isosceles triangle superimposed on the hoist side of the field. This triangle has its base on the hoist end, spans about half the width of the field and bears a small seven-pointed white star at its center."},"name":{"common":"Jordan","official":"Hashemite Kingdom of Jordan","nativeName":{"ara":{"official":"المملكة الأردنية الهاشمية","common":"الأردن"}}},"cca3":"JOR"},{"flags":{"png":"https://flagcdn.com/w320/re.png","svg":"https://flagcdn.com/re.svg","alt":""},"name":{"common":"Réunion","official":"Réunion Island","nativeName":{"fra":{"official":"Ile de la Réunion","common":"La Réunion"}}},"cca3":"REU"},{"flags":{"png":"https://flagcdn.com/w320/tr.png","svg":"https://flagcdn.com/tr.svg","alt":"The flag of Turkey has a red field bearing a large fly-side facing white crescent and a smaller five-pointed white star placed just outside the crescent opening. The white crescent and star are offset slightly towards the hoist side of center."},"name":{"common":"Turkey","official":"Republic of Turkey","nativeName":{"tur":{"official":"Türkiye Cumhuriyeti","common":"Türkiye"}}},"cca3":"TUR"},{"flags":{"png":"https://flagcdn.com/w320/tz.png","svg":"https://flagcdn.com/tz.svg","alt":"The flag of Tanzania features a yellow-edged black diagonal band that extends from the lower hoist-side corner to the upper fly-side corner of the field. Above and beneath this band are a green and light blue triangle respectively."},"name":{"common":"Tanzania","official":"United Republic of Tanzania","nativeName":{"eng":{"official":"United Republic of Tanzania","common":"Tanzania"},"swa":{"official":"Jamhuri ya Muungano wa Tanzania","common":"Tanzania"}}},"cca3":"TZA"},{"flags":{"png":"https://flagcdn.com/w320/ua.png","svg":"https://flagcdn.com/ua.svg","alt":"The flag of Ukraine is composed of two equal horizontal bands of blue and yellow."},"name":{"common":"Ukraine","official":"Ukraine","nativeName":{"ukr":{"official":"Україна","common":"Україна"}}},"cca3":"UKR"},{"flags":{"png":"https://flagcdn.com/w320/mu.png","svg":"https://flagcdn.com/mu.svg","alt":"The flag of Mauritius is composed of four equal horizontal bands of red, blue, yellow and green."},"name":{"common":"Mauritius","official":"Republic of Mauritius","nativeName":{"eng":{"official":"Republic of Mauritius","common":"Mauritius"},"fra":{"official":"République de Maurice","common":"Maurice"},"mfe":{"official":"Republik Moris","common":"Moris"}}},"cca3":"MUS"},{"flags":{"png":"https://flagcdn.com/w320/so.png","svg":"https://flagcdn.com/so.svg","alt":"The flag of Somalia features a large five-pointed white star centered on a light blue field."},"name":{"common":"Somalia","official":"Federal Republic of Somalia","nativeName":{"ara":{"official":"جمهورية الصومال‎‎","common":"الصومال‎‎"},"som":{"official":"Jamhuuriyadda Federaalka Soomaaliya","common":"Soomaaliya"}}},"cca3":"SOM"},{"flags":{"png":"https://flagcdn.com/w320/gn.png","svg":"https://flagcdn.com/gn.svg","alt":"The flag of Guinea is composed of three equal vertical bands of red, yellow and green."},"name":{"common":"Guinea","official":"Republic of Guinea","nativeName":{"fra":{"official":"République de Guinée","common":"Guinée"}}},"cca3":"GIN"},{"flags":{"png":"https://flagcdn.com/w320/gf.png","svg":"https://flagcdn.com/gf.svg","alt":""},"name":{"common":"French Guiana","official":"Guiana","nativeName":{"fra":{"official":"Guyane","common":"Guyane française"}}},"cca3":"GUF"},{"flags":{"png":"https://flagcdn.com/w320/mh.png","svg":"https://flagcdn.com/mh.svg","alt":"The flag of Marshall Islands has a blue field with two broadening adjacent diagonal bands of orange and white that extend from the lower hoist-side corner to the upper fly-side corner of the field. A large white star with twenty-four rays — four large rays at the cardinal points and twenty smaller rays — is situated in the upper hoist-side corner above the diagonal bands."},"name":{"common":"Marshall Islands","official":"Republic of the Marshall Islands","nativeName":{"eng":{"official":"Republic of the Marshall Islands","common":"Marshall Islands"},"mah":{"official":"Republic of the Marshall Islands","common":"M̧ajeļ"}}},"cca3":"MHL"},{"flags":{"png":"https://flagcdn.com/w320/sb.png","svg":"https://flagcdn.com/sb.svg","alt":"The flag of Solomon Islands features a thin yellow diagonal band that extends from the lower hoist-side corner to the upper fly-side corner of the field. Above and beneath this band are a blue and green triangle respectively. Five white five-pointed stars arranged in an X shape are situated on the hoist side of the upper blue triangle."},"name":{"common":"Solomon Islands","official":"Solomon Islands","nativeName":{"eng":{"official":"Solomon Islands","common":"Solomon Islands"}}},"cca3":"SLB"},{"flags":{"png":"https://flagcdn.com/w320/um.png","svg":"https://flagcdn.com/um.svg","alt":""},"name":{"common":"United States Minor Outlying Islands","official":"United States Minor Outlying Islands","nativeName":{"eng":{"official":"United States Minor Outlying Islands","common":"United States Minor Outlying Islands"}}},"cca3":"UMI"},{"flags":{"png":"https://flagcdn.com/w320/lt.png","svg":"https://flagcdn.com/lt.svg","alt":"The flag of Lithuania is composed of three equal horizontal bands of yellow, green and red."},"name":{"common":"Lithuania","official":"Republic of Lithuania","nativeName":{"lit":{"official":"Lietuvos Respublikos","common":"Lietuva"}}},"cca3":"LTU"},{"flags":{"png":"https://flagcdn.com/w320/si.png","svg":"https://flagcdn.com/si.svg","alt":"The flag of Slovenia is composed of three equal horizontal bands of white, blue and red. The national coat of arms is situated in the upper hoist side of the field centered on the boundary between the white and blue bands."},"name":{"common":"Slovenia","official":"Republic of Slovenia","nativeName":{"slv":{"official":"Republika Slovenija","common":"Slovenija"}}},"cca3":"SVN"},{"flags":{"png":"https://flagcdn.com/w320/ni.png","svg":"https://flagcdn.com/ni.svg","alt":"The flag of Nicaragua is composed of three equal horizontal bands of blue, white and blue, with the national coat of arms centered in the white band."},"name":{"common":"Nicaragua","official":"Republic of Nicaragua","nativeName":{"spa":{"official":"República de Nicaragua","common":"Nicaragua"}}},"cca3":"NIC"},{"flags":{"png":"https://flagcdn.com/w320/do.png","svg":"https://flagcdn.com/do.svg","alt":"The flag of the Dominican Republic is divided into four rectangles by a centered white cross that extends to the edges of the field and bears the national coat of arms in its center. The upper hoist-side and lower fly-side rectangles are blue and the lower hoist-side and upper fly-side rectangles are red."},"name":{"common":"Dominican Republic","official":"Dominican Republic","nativeName":{"spa":{"official":"República Dominicana","common":"República Dominicana"}}},"cca3":"DOM"},{"flags":{"png":"https://flagcdn.com/w320/iq.png","svg":"https://flagcdn.com/iq.svg","alt":"The flag of Iraq is composed of three equal horizontal bands of red, white and black. In the central white band are Arabic inscriptions in green."},"name":{"common":"Iraq","official":"Republic of Iraq","nativeName":{"ara":{"official":"جمهورية العراق","common":"العراق"},"arc":{"official":"ܩܘܼܛܢܵܐ ܐܝܼܪܲܩ","common":"ܩܘܼܛܢܵܐ"},"ckb":{"official":"کۆماری عێراق","common":"کۆماری"}}},"cca3":"IRQ"},{"flags":{"png":"https://flagcdn.com/w320/sv.png","svg":"https://flagcdn.com/sv.svg","alt":"The flag of El Salvador is composed of three equal horizontal bands of cobalt blue, white and cobalt blue, with the national coat of arms centered in the white band."},"name":{"common":"El Salvador","official":"Republic of El Salvador","nativeName":{"spa":{"official":"República de El Salvador","common":"El Salvador"}}},"cca3":"SLV"},{"flags":{"png":"https://flagcdn.com/w320/ve.png","svg":"https://flagcdn.com/ve.svg","alt":"The flag of Venezuela is composed of three equal horizontal bands of yellow, blue and red. At the center of the blue band are eight five-pointed white stars arranged in a horizontal arc."},"name":{"common":"Venezuela","official":"Bolivarian Republic of Venezuela","nativeName":{"spa":{"official":"República Bolivariana de Venezuela","common":"Venezuela"}}},"cca3":"VEN"},{"flags":{"png":"https://flagcdn.com/w320/zw.png","svg":"https://flagcdn.com/zw.svg","alt":"The flag of Zimbabwe is composed of seven equal horizontal bands of green, yellow, red, black, red, yellow and green, with a white isosceles triangle superimposed on the hoist side of the field. This triangle is edged in black, spans about one-fourth the width of the field and has its base on the hoist end. A yellow Zimbabwe bird superimposed on a five-pointed red star is centered in the triangle."},"name":{"common":"Zimbabwe","official":"Republic of Zimbabwe","nativeName":{"bwg":{"official":"Republic of Zimbabwe","common":"Zimbabwe"},"eng":{"official":"Republic of Zimbabwe","common":"Zimbabwe"},"kck":{"official":"Republic of Zimbabwe","common":"Zimbabwe"},"khi":{"official":"Republic of Zimbabwe","common":"Zimbabwe"},"ndc":{"official":"Republic of Zimbabwe","common":"Zimbabwe"},"nde":{"official":"Republic of Zimbabwe","common":"Zimbabwe"},"nya":{"official":"Republic of Zimbabwe","common":"Zimbabwe"},"sna":{"official":"Republic of Zimbabwe","common":"Zimbabwe"},"sot":{"official":"Republic of Zimbabwe","common":"Zimbabwe"},"toi":{"official":"Republic of Zimbabwe","common":"Zimbabwe"},"tsn":{"official":"Republic of Zimbabwe","common":"Zimbabwe"},"tso":{"official":"Republic of Zimbabwe","common":"Zimbabwe"},"ven":{"official":"Republic of Zimbabwe","common":"Zimbabwe"},"xho":{"official":"Republic of Zimbabwe","common":"Zimbabwe"},"zib":{"official":"Republic of Zimbabwe","common":"Zimbabwe"}}},"cca3":"ZWE"},{"flags":{"png":"https://flagcdn.com/w320/se.png","svg":"https://flagcdn.com/se.svg","alt":"The flag of Sweden has a blue field with a large golden-yellow cross that extend to the edges of the field. The vertical part of this cross is offset towards the hoist side."},"name":{"common":"Sweden","official":"Kingdom of Sweden","nativeName":{"swe":{"official":"Konungariket Sverige","common":"Sverige"}}},"cca3":"SWE"},{"flags":{"png":"https://flagcdn.com/w320/th.png","svg":"https://flagcdn.com/th.svg","alt":"The flag of Thailand is composed of five horizontal bands of red, white, blue, white and red, with the central blue band twice the height of the other four bands."},"name":{"common":"Thailand","official":"Kingdom of Thailand","nativeName":{"tha":{"official":"ราชอาณาจักรไทย","common":"ประเทศไทย"}}},"cca3":"THA"},{"flags":{"png":"https://flagcdn.com/w320/tl.png","svg":"https://flagcdn.com/tl.svg","alt":"The flag of Timor-Leste has a red field with two isosceles triangles which share a common base on the hoist end. The smaller black triangle, which bears a five-pointed white star at its center and spans one-third the width of the field, is superimposed on the larger yellow triangle that extends to the center of the field."},"name":{"common":"Timor-Leste","official":"Democratic Republic of Timor-Leste","nativeName":{"por":{"official":"República Democrática de Timor-Leste","common":"Timor-Leste"},"tet":{"official":"Repúblika Demokrátika Timór-Leste","common":"Timór-Leste"}}},"cca3":"TLS"},{"flags":{"png":"https://flagcdn.com/w320/ba.png","svg":"https://flagcdn.com/ba.svg","alt":"The flag of Bosnia and Herzegovina has a blue field, at the center of which is a large yellow hoist-side facing right-angled triangle that is based on the top edge and spans the height of the field. Adjacent to the hypotenuse of this triangle are nine adjoining five-pointed white stars with the top and bottom stars cut in half by the edges of the field."},"name":{"common":"Bosnia and Herzegovina","official":"Bosnia and Herzegovina","nativeName":{"bos":{"official":"Bosna i Hercegovina","common":"Bosna i Hercegovina"},"hrv":{"official":"Bosna i Hercegovina","common":"Bosna i Hercegovina"},"srp":{"official":"Босна и Херцеговина","common":"Босна и Херцеговина"}}},"cca3":"BIH"},{"flags":{"png":"https://flagcdn.com/w320/gw.png","svg":"https://flagcdn.com/gw.svg","alt":"The flag of Guinea-Bissau features a red vertical band on its hoist side that takes up about two-fifth the width of the field, and two equal horizontal bands of yellow and green adjoining the vertical band. A five-pointed black star is centered in the vertical band."},"name":{"common":"Guinea-Bissau","official":"Republic of Guinea-Bissau","nativeName":{"por":{"official":"República da Guiné-Bissau","common":"Guiné-Bissau"},"pov":{"official":"República da Guiné-Bissau","common":"Guiné-Bissau"}}},"cca3":"GNB"},{"flags":{"png":"https://flagcdn.com/w320/ms.png","svg":"https://flagcdn.com/ms.svg","alt":""},"name":{"common":"Montserrat","official":"Montserrat","nativeName":{"eng":{"official":"Montserrat","common":"Montserrat"}}},"cca3":"MSR"},{"flags":{"png":"https://flagcdn.com/w320/dm.png","svg":"https://flagcdn.com/dm.svg","alt":"The flag of Dominica has a green field with a large centered tricolor cross. The vertical and horizontal parts of the cross each comprise three bands of yellow, black and white. A red circle, bearing a hoist-side facing purple Sisserou parrot standing on a twig and encircled by ten five-pointed yellow-edged green stars, is superimposed at the center of the cross."},"name":{"common":"Dominica","official":"Commonwealth of Dominica","nativeName":{"eng":{"official":"Commonwealth of Dominica","common":"Dominica"}}},"cca3":"DMA"},{"flags":{"png":"https://flagcdn.com/w320/fk.png","svg":"https://flagcdn.com/fk.svg","alt":""},"name":{"common":"Falkland Islands","official":"Falkland Islands","nativeName":{"eng":{"official":"Falkland Islands","common":"Falkland Islands"}}},"cca3":"FLK"},{"flags":{"png":"https://flagcdn.com/w320/bq.png","svg":"https://flagcdn.com/bq.svg","alt":""},"name":{"common":"Caribbean Netherlands","official":"Bonaire, Sint Eustatius and Saba","nativeName":{"nld":{"official":"Bonaire, Sint Eustatius en Saba","common":"Caribisch Nederland"},"pap":{"official":"Boneiru, Sint Eustatius y Saba","common":"Boneiru, Sint Eustatius y Saba"}}},"cca3":"BES"},{"flags":{"png":"https://flagcdn.com/w320/dj.png","svg":"https://flagcdn.com/dj.svg","alt":"The flag of Djibouti is composed of two equal horizontal bands of light blue and light green, with a white isosceles triangle superimposed on the hoist side of the field. The triangle has its base on the hoist end, spans about two-fifth the width of the field and bears a red five-pointed star at its center."},"name":{"common":"Djibouti","official":"Republic of Djibouti","nativeName":{"ara":{"official":"جمهورية جيبوتي","common":"جيبوتي‎"},"fra":{"official":"République de Djibouti","common":"Djibouti"}}},"cca3":"DJI"},{"flags":{"png":"https://flagcdn.com/w320/aq.png","svg":"https://flagcdn.com/aq.svg","alt":""},"name":{"common":"Antarctica","official":"Antarctica","nativeName":{}},"cca3":"ATA"},{"flags":{"png":"https://flagcdn.com/w320/ht.png","svg":"https://flagcdn.com/ht.svg","alt":"The flag of Haiti is composed of two equal horizontal bands of blue and red. A white square bearing the national coat of arms is superimposed at the center of the field."},"name":{"common":"Haiti","official":"Republic of Haiti","nativeName":{"fra":{"official":"République d'Haïti","common":"Haïti"},"hat":{"official":"Repiblik Ayiti","common":"Ayiti"}}},"cca3":"HTI"},{"flags":{"png":"https://flagcdn.com/w320/km.png","svg":"https://flagcdn.com/km.svg","alt":"The flag of Comoros is composed of four equal horizontal bands of yellow, white, red and blue, with a green isosceles triangle superimposed on the hoist side of the field. This triangle has its base on the hoist end, spans about two-fifth the width of the field and bears a fly-side facing white crescent and four five-pointed white stars arranged in a vertical line along the opening of the crescent."},"name":{"common":"Comoros","official":"Union of the Comoros","nativeName":{"ara":{"official":"الاتحاد القمري","common":"القمر‎"},"fra":{"official":"Union des Comores","common":"Comores"},"zdj":{"official":"Udzima wa Komori","common":"Komori"}}},"cca3":"COM"},{"flags":{"png":"https://flagcdn.com/w320/it.png","svg":"https://flagcdn.com/it.svg","alt":"The flag of Italy is composed of three equal vertical bands of green, white and red."},"name":{"common":"Italy","official":"Italian Republic","nativeName":{"ita":{"official":"Repubblica italiana","common":"Italia"}}},"cca3":"ITA"},{"flags":{"png":"https://flagcdn.com/w320/by.png","svg":"https://flagcdn.com/by.svg","alt":"The flag of Belarus features a vertical band, with a white and red ornamental pattern, spanning about one-fifth the width of the field on the hoist side. Adjoining the vertical band are two horizontal bands of red and green, with the red band twice the height of the green band."},"name":{"common":"Belarus","official":"Republic of Belarus","nativeName":{"bel":{"official":"Рэспубліка Беларусь","common":"Белару́сь"},"rus":{"official":"Республика Беларусь","common":"Беларусь"}}},"cca3":"BLR"},{"flags":{"png":"https://flagcdn.com/w320/ky.png","svg":"https://flagcdn.com/ky.svg","alt":""},"name":{"common":"Cayman Islands","official":"Cayman Islands","nativeName":{"eng":{"official":"Cayman Islands","common":"Cayman Islands"}}},"cca3":"CYM"},{"flags":{"png":"https://flagcdn.com/w320/fr.png","svg":"https://flagcdn.com/fr.svg","alt":"The flag of France is composed of three equal vertical bands of blue, white and red."},"name":{"common":"France","official":"French Republic","nativeName":{"fra":{"official":"République française","common":"France"}}},"cca3":"FRA"},{"flags":{"png":"https://flagcdn.com/w320/sn.png","svg":"https://flagcdn.com/sn.svg","alt":"The flag of Senegal is composed of three equal vertical bands of green, golden-yellow and red, with a five-pointed green star centered in the golden-yellow band."},"name":{"common":"Senegal","official":"Republic of Senegal","nativeName":{"fra":{"official":"République du Sénégal","common":"Sénégal"}}},"cca3":"SEN"},{"flags":{"png":"https://flagcdn.com/w320/cn.png","svg":"https://flagcdn.com/cn.svg","alt":"The flag of China has a red field. In the canton are five yellow five-pointed stars — a large star and four smaller stars arranged in a vertical arc on the fly side of the large star."},"name":{"common":"China","official":"People's Republic of China","nativeName":{"zho":{"official":"中华人民共和国","common":"中国"}}},"cca3":"CHN"},{"flags":{"png":"https://flagcdn.com/w320/sd.png","svg":"https://flagcdn.com/sd.svg","alt":"The flag of Sudan is composed of three equal horizontal bands of red, white and black, with a green isosceles triangle superimposed on the hoist side. The green triangle spans about two-fifth the width of the field with its base on the hoist end."},"name":{"common":"Sudan","official":"Republic of the Sudan","nativeName":{"ara":{"official":"جمهورية السودان","common":"السودان"},"eng":{"official":"Republic of the Sudan","common":"Sudan"}}},"cca3":"SDN"},{"flags":{"png":"https://flagcdn.com/w320/om.png","svg":"https://flagcdn.com/om.svg","alt":"The flag of Oman features a red vertical band on the hoist side that takes up about one-fourth the width of the field, and three equal horizontal bands of white, red and green adjoining the vertical band. At the top of the vertical band is the white emblem of Oman."},"name":{"common":"Oman","official":"Sultanate of Oman","nativeName":{"ara":{"official":"سلطنة عمان","common":"عمان"}}},"cca3":"OMN"},{"flags":{"png":"https://flagcdn.com/w320/gb.png","svg":"https://flagcdn.com/gb.svg","alt":"The flag of the United Kingdom — the Union Jack — has a blue field. It features the white-edged red cross of Saint George superimposed on the diagonal red cross of Saint Patrick which is superimposed on the diagonal white cross of Saint Andrew."},"name":{"common":"United Kingdom","official":"United Kingdom of Great Britain and Northern Ireland","nativeName":{"eng":{"official":"United Kingdom of Great Britain and Northern Ireland","common":"United Kingdom"}}},"cca3":"GBR"},{"flags":{"png":"https://flagcdn.com/w320/mx.png","svg":"https://flagcdn.com/mx.svg","alt":"The flag of Mexico is composed of three equal vertical bands of green, white and red, with the national coat of arms centered in the white band."},"name":{"common":"Mexico","official":"United Mexican States","nativeName":{"spa":{"official":"Estados Unidos Mexicanos","common":"México"}}},"cca3":"MEX"},{"flags":{"png":"https://flagcdn.com/w320/au.png","svg":"https://flagcdn.com/au.svg","alt":"The flag of Australia has a dark blue field. It features the flag of the United Kingdom — the Union Jack — in the canton, beneath which is a large white seven-pointed star. A representation of the Southern Cross constellation, made up of one small five-pointed and four larger seven-pointed white stars, is situated on the fly side of the field."},"name":{"common":"Australia","official":"Commonwealth of Australia","nativeName":{"eng":{"official":"Commonwealth of Australia","common":"Australia"}}},"cca3":"AUS"},{"flags":{"png":"https://flagcdn.com/w320/cu.png","svg":"https://flagcdn.com/cu.svg","alt":"The flag of Cuba is composed of five equal horizontal bands of blue alternating with white and a red equilateral triangle superimposed on the hoist side of the field. The triangle has its base on the hoist end, spans about two-fifth the width of the field and bears a white five-pointed star at its center."},"name":{"common":"Cuba","official":"Republic of Cuba","nativeName":{"spa":{"official":"República de Cuba","common":"Cuba"}}},"cca3":"CUB"},{"flags":{"png":"https://flagcdn.com/w320/er.png","svg":"https://flagcdn.com/er.svg","alt":"The flag of Eritrea comprises three triangles — a large red isosceles triangle with its base spanning the hoist end and its apex at the midpoint on the fly end, and a green and blue right-angled triangle above and beneath the red triangle. On the hoist side of the red triangle is a golden vertical olive branch encircled by a golden olive wreath."},"name":{"common":"Eritrea","official":"State of Eritrea","nativeName":{"ara":{"official":"دولة إرتريا","common":"إرتريا‎"},"eng":{"official":"State of Eritrea","common":"Eritrea"},"tir":{"official":"ሃገረ ኤርትራ","common":"ኤርትራ"}}},"cca3":"ERI"},{"flags":{"png":"https://flagcdn.com/w320/bg.png","svg":"https://flagcdn.com/bg.svg","alt":"The flag of Bulgaria is composed of three equal horizontal bands of white, green and red."},"name":{"common":"Bulgaria","official":"Republic of Bulgaria","nativeName":{"bul":{"official":"Република България","common":"България"}}},"cca3":"BGR"},{"flags":{"png":"https://flagcdn.com/w320/ro.png","svg":"https://flagcdn.com/ro.svg","alt":"The flag of Romania is composed of three equal vertical bands of navy blue, yellow and red."},"name":{"common":"Romania","official":"Romania","nativeName":{"ron":{"official":"România","common":"România"}}},"cca3":"ROU"},{"flags":{"png":"https://flagcdn.com/w320/fm.png","svg":"https://flagcdn.com/fm.svg","alt":"The flag of Micronesia has a light blue field, at the center of which are four five-pointed white stars arranged in the shape of a diamond."},"name":{"common":"Micronesia","official":"Federated States of Micronesia","nativeName":{"eng":{"official":"Federated States of Micronesia","common":"Micronesia"}}},"cca3":"FSM"},{"flags":{"png":"https://flagcdn.com/w320/vu.png","svg":"https://flagcdn.com/vu.svg","alt":"The flag of Vanuatu is composed of two equal horizontal bands of red and green, with a black isosceles triangle superimposed on the hoist side of the field. This triangle has its base on the hoist end, spans about two-fifth the width of the field and is enclosed on its sides by the arms of a thin black-edged yellow horizontally oriented Y-shaped band which extends along the boundary of the red and green bands to the fly end of the field. A yellow boar's tusk encircling two yellow crossed namele leaves is centered in the triangle."},"name":{"common":"Vanuatu","official":"Republic of Vanuatu","nativeName":{"bis":{"official":"Ripablik blong Vanuatu","common":"Vanuatu"},"eng":{"official":"Republic of Vanuatu","common":"Vanuatu"},"fra":{"official":"République de Vanuatu","common":"Vanuatu"}}},"cca3":"VUT"},{"flags":{"png":"https://flagcdn.com/w320/sy.png","svg":"https://flagcdn.com/sy.svg","alt":"The flag of Syria is composed of three equal horizontal bands of red, white and black. At the center of the white band are two small five-pointed green stars arranged in a horizontal line."},"name":{"common":"Syria","official":"Syrian Arab Republic","nativeName":{"ara":{"official":"الجمهورية العربية السورية","common":"سوريا"}}},"cca3":"SYR"},{"flags":{"png":"https://flagcdn.com/w320/st.png","svg":"https://flagcdn.com/st.svg","alt":"The flag of South Sudan is composed of three equal horizontal bands of black, red with white top and bottom edges, and green. A blue equilateral triangle which spans about two-fifth the width of the field is superimposed on the hoist side with its base on the hoist end of the field. At the center of this triangle is a five-pointed yellow star."},"name":{"common":"São Tomé and Príncipe","official":"Democratic Republic of São Tomé and Príncipe","nativeName":{"por":{"official":"República Democrática do São Tomé e Príncipe","common":"São Tomé e Príncipe"}}},"cca3":"STP"},{"flags":{"png":"https://flagcdn.com/w320/de.png","svg":"https://flagcdn.com/de.svg","alt":"The flag of Germany is composed of three equal horizontal bands of black, red and gold."},"name":{"common":"Germany","official":"Federal Republic of Germany","nativeName":{"deu":{"official":"Bundesrepublik Deutschland","common":"Deutschland"}}},"cca3":"DEU"},{"flags":{"png":"https://flagcdn.com/w320/nz.png","svg":"https://flagcdn.com/nz.svg","alt":"The flag of New Zealand has a dark blue field with the flag of the United Kingdom — the Union Jack — in the canton and a representation of the Southern Cross constellation, made up of four five-pointed white-edged red stars, on the fly side of the field."},"name":{"common":"New Zealand","official":"New Zealand","nativeName":{"eng":{"official":"New Zealand","common":"New Zealand"},"mri":{"official":"Aotearoa","common":"Aotearoa"},"nzs":{"official":"New Zealand","common":"New Zealand"}}},"cca3":"NZL"},{"flags":{"png":"https://flagcdn.com/w320/ao.png","svg":"https://flagcdn.com/ao.svg","alt":"The flag of Angola features two equal horizontal bands of red and black, with a yellow emblem at its centre. This emblem consists of a five-pointed star within the hoist-side facing half of a cogwheel that is crossed on its lower end by a machete."},"name":{"common":"Angola","official":"Republic of Angola","nativeName":{"por":{"official":"República de Angola","common":"Angola"}}},"cca3":"AGO"},{"flags":{"png":"https://flagcdn.com/w320/cx.png","svg":"https://flagcdn.com/cx.svg","alt":""},"name":{"common":"Christmas Island","official":"Territory of Christmas Island","nativeName":{"eng":{"official":"Territory of Christmas Island","common":"Christmas Island"}}},"cca3":"CXR"},{"flags":{"png":"https://flagcdn.com/w320/aw.png","svg":"https://flagcdn.com/aw.svg","alt":""},"name":{"common":"Aruba","official":"Aruba","nativeName":{"nld":{"official":"Aruba","common":"Aruba"},"pap":{"official":"Aruba","common":"Aruba"}}},"cca3":"ABW"},{"flags":{"png":"https://flagcdn.com/w320/in.png","svg":"https://flagcdn.com/in.svg","alt":"The flag of India is composed of three equal horizontal bands of saffron, white and green. A navy blue wheel with twenty-four spokes — the Ashoka Chakra — is centered in the white band."},"name":{"common":"India","official":"Republic of India","nativeName":{"eng":{"official":"Republic of India","common":"India"},"hin":{"official":"भारत गणराज्य","common":"भारत"},"tam":{"official":"இந்தியக் குடியரசு","common":"இந்தியா"}}},"cca3":"IND"},{"flags":{"png":"https://flagcdn.com/w320/my.png","svg":"https://flagcdn.com/my.svg","alt":"The flag of Malaysia is composed of fourteen equal horizontal bands of red alternating with white. A blue rectangle, bearing a fly-side facing yellow crescent and a fourteen-pointed yellow star placed just outside the crescent opening, is superimposed in the canton."},"name":{"common":"Malaysia","official":"Malaysia","nativeName":{"eng":{"official":"Malaysia","common":"Malaysia"},"msa":{"official":"مليسيا","common":"مليسيا"}}},"cca3":"MYS"},{"flags":{"png":"https://flagcdn.com/w320/ge.png","svg":"https://flagcdn.com/ge.svg","alt":"The flag of Georgia has a white field with a large centered red cross that extends to the edges and divides the field into four quarters. A small red Bolnur-Katskhuri cross is centered in each quarter."},"name":{"common":"Georgia","official":"Georgia","nativeName":{"kat":{"official":"საქართველო","common":"საქართველო"}}},"cca3":"GEO"},{"flags":{"png":"https://flagcdn.com/w320/nc.png","svg":"https://flagcdn.com/nc.svg","alt":""},"name":{"common":"New Caledonia","official":"New Caledonia","nativeName":{"fra":{"official":"Nouvelle-Calédonie","common":"Nouvelle-Calédonie"}}},"cca3":"NCL"},{"flags":{"png":"https://flagcdn.com/w320/ly.png","svg":"https://flagcdn.com/ly.svg","alt":"The flag of Libya is composed of three horizontal bands of red, black and green, with the black band twice the height of the other two bands. At the center of the black band is a fly-side facing white crescent and a five-pointed white star placed just outside the crescent opening."},"name":{"common":"Libya","official":"State of Libya","nativeName":{"ara":{"official":"الدولة ليبيا","common":"‏ليبيا"}}},"cca3":"LBY"},{"flags":{"png":"https://flagcdn.com/w320/ax.png","svg":"https://flagcdn.com/ax.svg","alt":""},"name":{"common":"Åland Islands","official":"Åland Islands","nativeName":{"swe":{"official":"Landskapet Åland","common":"Åland"}}},"cca3":"ALA"},{"flags":{"png":"https://flagcdn.com/w320/mq.png","svg":"https://flagcdn.com/mq.svg","alt":""},"name":{"common":"Martinique","official":"Martinique","nativeName":{"fra":{"official":"Martinique","common":"Martinique"}}},"cca3":"MTQ"},{"flags":{"png":"https://flagcdn.com/w320/br.png","svg":"https://flagcdn.com/br.svg","alt":"The flag of Brazil has a green field with a large yellow rhombus in the center. Within the rhombus is a dark blue globe with twenty-seven small five-pointed white stars depicting a starry sky and a thin white convex horizontal band inscribed with the national motto 'Ordem e Progresso' across its center."},"name":{"common":"Brazil","official":"Federative Republic of Brazil","nativeName":{"por":{"official":"República Federativa do Brasil","common":"Brasil"}}},"cca3":"BRA"}];

const countries = countriesUnsorted.sort((a, b) => a.name.common.localeCompare(b.name.common));

//const resourceUri = 'http://localhost:5000';
const resourceUri = 'https://res.fab.lat';
const landingUri = 'https://fab.lat';



app.config(function($mdThemingProvider, $mdIconProvider, $urlRouterProvider, $stateProvider) {

	$mdThemingProvider.theme('default')
		.primaryPalette('purple', {
			'default': '500',
			'hue-1': '300',
			'hue-2': '700',
			'hue-3': '800'
		})
		.accentPalette('pink', {
			'default': '400',
			'hue-1': '300',
			'hue-2': '600',
			'hue-3': '800'
		})
		.warnPalette('deep-orange', {

		});

	// Neutral theme
	$mdThemingProvider.theme('neutral').primaryPalette('grey', {
		'default': '500',
		'hue-1': '50',
		'hue-2': '100',
		'hue-3': '200'
	});

	// Dark palettes
	$mdThemingProvider.theme('darkRed').backgroundPalette('red').dark();
	$mdThemingProvider.theme('darkPink').backgroundPalette('pink', {
		'default': '500',
		'hue-1': '500' }).dark();
	$mdThemingProvider.theme('darkPurple').backgroundPalette('purple').dark();
	$mdThemingProvider.theme('darkDeepPurple').backgroundPalette('deep-purple').dark();
	$mdThemingProvider.theme('darkIndigo').backgroundPalette('indigo').dark();
	$mdThemingProvider.theme('darkBlue').backgroundPalette('blue').dark();
	$mdThemingProvider.theme('darkLightBlue').backgroundPalette('light-blue').dark();
	$mdThemingProvider.theme('darkCyan').backgroundPalette('cyan').dark();
	$mdThemingProvider.theme('darkTeal').backgroundPalette('teal').dark();
	$mdThemingProvider.theme('darkGreen').backgroundPalette('green').dark();
	$mdThemingProvider.theme('darkLightGreen').backgroundPalette('light-green').dark();
	$mdThemingProvider.theme('darkLime').backgroundPalette('lime').dark();
	$mdThemingProvider.theme('darkYellow').backgroundPalette('yellow').dark();
	$mdThemingProvider.theme('darkAmber').backgroundPalette('amber').dark();
	$mdThemingProvider.theme('darkOrange').backgroundPalette('orange').dark();
	$mdThemingProvider.theme('darkDeepOrange').backgroundPalette('deep-orange').dark();
	$mdThemingProvider.theme('darkBrown').backgroundPalette('brown').dark();
	$mdThemingProvider.theme('darkGrey').backgroundPalette('grey').dark();
	$mdThemingProvider.theme('darkBlueGrey').backgroundPalette('blue-grey').dark();

	// Normal palettes
	$mdThemingProvider.theme('lime').backgroundPalette('lime');

	// Iconset
	$mdIconProvider.defaultIconSet('images/mdi.svg');

    // Routes config
    $urlRouterProvider.otherwise(function() {
        return '/';
    });

    $stateProvider.state({
        name: 'dashboard',
        abstract: true,
        url: '/',
        templateUrl: 'dashboard.html',
//        resolve: {
//           authenticatedUser: function(authService) {
//               return authService.createOrUpdateUser()
//                        .then(() => authService.getAuthenticatedUser());
//          }
//        }
    });

    $stateProvider.state({
        name: 'dashboard.groups',
        url: '',
        templateUrl: 'dashboard.groups.html'
    });

    $stateProvider.state({
        name: 'dashboard.general-activity',
        url: '/general-activity',
        templateUrl: 'dashboard.general-activity.html'
    });

    $stateProvider.state({
        name: 'groups',
        url: '/groups',
        templateUrl: 'groups.html'
    });

    $stateProvider.state({
        name: 'workshops',
        url: '/workshops',
        templateUrl: 'workshops.html'
    });

    $stateProvider.state({
        name: 'settings',
        abstract: true,
        url: '/settings',
        templateUrl: 'settings.html',
        controller: function($scope){
            $scope.currentNavItem = 'profile';
        }
    });

    $stateProvider.state({
        name: 'settings.profile',
        url: '/profile',
        templateUrl: 'settings.profile.html'
    });

    $stateProvider.state({
        name: 'settings.password',
        url: '/password',
        templateUrl: 'settings.password.html'
    });

    $stateProvider.state({
        name: 'fabber',
        abstract: true,
        url: '/fabber/:idFabber',
        templateUrl: 'fabber.html',
        controller: function($scope) {
            $scope.currentNavItem = 'groups';
        }
    });

    $stateProvider.state({
        name: 'fabber.groups',
        url: '',
        templateUrl: 'fabber.groups.html'
    });

    $stateProvider.state({
        name: 'fabber.activity',
        url: '/activity',
        templateUrl: 'fabber.activity.html'
    });

    $stateProvider.state({
        name: 'group-out',
        url: '/group-out/:idGroup',
        templateUrl: 'group-out.html'
    });

    $stateProvider.state({
        name: 'subgroup-out',
        url: '/subgroup-out/:idSubgroup',
        templateUrl: 'subgroup-out.html'
    });

    $stateProvider.state({
        name: 'workshop-out',
        url: '/workshop-out/:idWorkshop',
        templateUrl: 'workshop-out.html'
    });


    /*========== group states ==========*/
    $stateProvider.state({
        name: 'group',
        abstract: true,
        url: '/group/:idGroup',
        templateUrl: 'group.html',
        resolve: {
        	redirectIfNotMember: function($http, $stateParams, $state, $q, $timeout, $rootScope, authService) {
        		$rootScope.isLoading = true;
        		var deferred = $q.defer();

        		authService.getAuthenticatedUser()
        		    .then(user => $http.get(`${resourceUri}/auth/groups/${$stateParams.idGroup}/verify-me/${user.email}`))
	        		.then(response => {
	        			// if user is not member redirect to external page
	        			if (response.data.amIMember) {
	        				deferred.resolve();
	        			} else {
	        				$timeout(function() {
	    				      $state.go("group-out", { idGroup: $stateParams.idGroup }, {});
	    				    });
	        				deferred.reject();
	        			}
	        		});
        		return deferred.promise;
        	},
        	group: function($http, $stateParams, $rootScope, authService) {
        	    return authService.getAuthenticatedUser()
        	        .then(user => $http.get(`${resourceUri}/auth/groups/${$stateParams.idGroup}/${user.email}`))
            		.then(response => {
            			$rootScope.isLoading = false;
            			return response.data;
            		});
        	}
        },
        controller: function($scope, group) {
            $scope.group = group;
        }
    });

    $stateProvider.state({
        name: 'group.general',
        url: '/general',
        templateUrl: 'group.general.html',

    });

    $stateProvider.state({
        name: 'group.discussion',
        url: '/discussion',
        templateUrl: 'group.discussion.html'
    });

    $stateProvider.state({
        name: 'group.activity',
        url: '/activity',
        templateUrl: 'group.activity.html'
    });

    $stateProvider.state({
        name: 'group.members',
        url: '/members',
        templateUrl: 'group.members.html',
        controller: function($scope){
            $scope.currentNavItem = 'members';
        }
    });

    $stateProvider.state({
        name: 'group.subgroups',
        url: '/subgroups',
        templateUrl: 'group.subgroups.html',
        controller: function($scope){
            $scope.currentNavItem = 'subgroups';
        }
    });

    $stateProvider.state({
        name: 'group.settings',
        abstract: true,
        url: '/settings',
        templateUrl: 'group.settings.html',
        controller: function($scope){
            $scope.currentNavItem = 'general';
        }
    });

    $stateProvider.state({
        name: 'group.settings.general',
        url: '/general',
        templateUrl: 'group.settings.general.html',
        controller: function($scope){
            $scope.currentNavItem = 'general';
        }
    });


    /*=========== subgroup states ===========*/

    $stateProvider.state({
        name: 'subgroup',
        abstract: true,
        url: '/subgroup/:idSubgroup',
        templateUrl: 'subgroup.html',
        resolve: {
        	redirectIfNotMember: function($http, $stateParams, $state, $q, $timeout, $rootScope, authService) {
        		$rootScope.isLoading = true;
        		var deferred = $q.defer();

        		authService.getAuthenticatedUser()
        		    .then(user => $http.get(`${resourceUri}/auth/subgroups/${$stateParams.idSubgroup}/verify-me/${user.email}`))
                    .then(response => {
                        // if user is not member redirect to external page
                        if (response.data.amIMember) {
                            deferred.resolve();
                        } else {
                            $timeout(function () {
                              $state.go("subgroup-out", { idSubgroup: $stateParams.idSubgroup }, {});
                            });
                            deferred.reject();
                        }
                    });
        		return deferred.promise;
        	},
        	subgroup: function($http, $stateParams, $rootScope, authService) {
        	    return authService.getAuthenticatedUser()
        	                .then(user => $http.get(`${resourceUri}/auth/subgroups/${$stateParams.idSubgroup}/${user.email}`))
        	                .then(function(response) {
                                $rootScope.isLoading = false;
                                return response.data;
                            });
        	}
        },
        controller: function($scope, subgroup) {
            $scope.subgroup = subgroup;
        }
    });

    $stateProvider.state({
        name: 'subgroup.general',
        url: '/general',
        templateUrl: 'subgroup.general.html'
    });

    $stateProvider.state({
        name: 'subgroup.discussion',
        url: '/discussion',
        templateUrl: 'subgroup.discussion.html'
    });

    $stateProvider.state({
        name: 'subgroup.ideas',
        url: '/ideas',
        templateUrl: 'subgroup.ideas.html'
    });

    $stateProvider.state({
        name: 'subgroup.activity',
        url: '/activity',
        templateUrl: 'subgroup.activity.html'
    });

    $stateProvider.state({
        name: 'subgroup.members',
        url: '/members',
        templateUrl: 'subgroup.members.html',
        controller: function($scope){
            $scope.currentNavItem = 'members';
        }
    });

    $stateProvider.state({
        name: 'subgroup.workshops',
        url: '/workshops',
        templateUrl: 'subgroup.workshops.html',
        controller: function($scope){
            $scope.currentNavItem = 'workshops';
        }
    });

    $stateProvider.state({
        name: 'subgroup.settings',
        abstract: true,
        url: '/settings',
        templateUrl: 'subgroup.settings.html',
        controller: function($scope){
            $scope.currentNavItem = 'general';
        }
    });

    $stateProvider.state({
        name: 'subgroup.settings.general',
        url: '/general',
        templateUrl: 'subgroup.settings.general.html',
        controller: function($scope){
            $scope.currentNavItem = 'general';
        }
    });

    $stateProvider.state({
        name: 'subgroup.addWorkshop',
        url: '/addWorkshop',
        templateUrl: 'subgroup.add-workshop.html'
    });


    /*=========== workshop states ===========*/

    $stateProvider.state({
        name: 'workshop',
        abstract: true,
        url: '/workshop/:idWorkshop',
        templateUrl: 'workshop.html',
        resolve: {
        	redirectIfNotTutor: function($http, $stateParams, $state, $q, $timeout, authService) {
        		var deferred = $q.defer();

        		authService.getAuthenticatedUser()
        		    .then(user => $http.get(`${resourceUri}/auth/workshops/${$stateParams.idWorkshop}/${user.email}`))
                    .then(response => {
                        // if user is not tutor redirect to external page
                        if (response.data.amITutor) {
                            deferred.resolve();
                        } else {
                            $timeout(function () {
                              $state.go("workshop-out", { idWorkshop: $stateParams.idWorkshop }, {});
                            });
                            deferred.reject();
                        }
                    });
        		return deferred.promise;
        	},
        	workshop: function($http, $stateParams, authService) {
        	    return authService.getAuthenticatedUser()
                        .then(user => $http.get(`${resourceUri}/auth/workshops/${$stateParams.idWorkshop}/${user.email}`))
                        .then(response => {
                            return response.data;
                        });
        	}
        },
        controller: function($scope, workshop) {
            $scope.workshop = workshop;
        }
    });

    $stateProvider.state({
        name: 'workshop.general',
        url: '/general',
        templateUrl: 'workshop.general.html'
    });

    $stateProvider.state({
        name: 'workshop.tutors',
        url: '/tutors',
        templateUrl: 'workshop.tutors.html',
        controller: function($scope){
            $scope.currentNavItem = 'general';
        }
    });

    $stateProvider.state({
        name: 'workshop.settings',
        abstract: true,
        url: '/settings',
        templateUrl: 'workshop.settings.html',
        controller: function($scope){
            $scope.currentNavItem = 'general';
        }
    });

    $stateProvider.state({
        name: 'workshop.settings.general',
        url: '/general',
        templateUrl: 'workshop.settings.general.html',
        controller: function($scope){
            $scope.currentNavItem = 'general';
        }
    });

});

app.config(['cloudinaryProvider', function (cloudinaryProvider) {
	cloudinaryProvider
		.set("cloud_name", "dymje6shc")
		.set("secure", true)
		.set("upload_preset", "u6pnku96");
}]);

app.config(function($sceDelegateProvider) {
	$sceDelegateProvider.resourceUrlWhitelist([
	 // Allow same origin resource loads.
     'self',
     // Allow loading from our assets domain.  Notice the difference between * and **.
     'http://res.cloudinary.com/**'
   ]);
 });





app.controller('AppCtrl', ['$rootScope', '$http', '$scope', 'authService',
            function($rootScope, $http, $scope, authService) {

    $rootScope.isLoading = false;
    $rootScope.user = null;

    $rootScope.setAuthUser = authService.getAuthenticatedUser()
        .then(user => {
            $rootScope.user = user;
            $rootScope.user.hasAdminGeneralRole = user.authorities.find(x => x === 'ROLE_ADMIN_GENERAL') ? true : false;
            $rootScope.user.hasAdminLabRole = user.authorities.find(x => x === 'ROLE_ADMIN_LAB') ? true : false;
        });

    // Toolbar search toggle
    $scope.toggleSearch = function(element) {
        $scope.showSearch = !$scope.showSearch;
    };

    // Sidenav toggle
    $scope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
    };
}]);



/*========== General controllers ==========*/

// Controller in: dashboard.html
app.controller('DashboardCtrl', function($scope) {

	$scope.currentNavItem = 'groups';

});

// Controller in: dashboard.groups.html
app.controller('DashboardGroupsCtrl', function($rootScope, $scope, $http, $mdDialog) {

	$scope.noGroups = false;
	$scope.groups1 = [];
	$scope.groups2 = [];
	$scope.groups3 = [];

    $rootScope.setAuthUser
	    .then(() => $http.get(`${resourceUri}/auth/groups/find-all-mine/${$rootScope.user.email}`))
	    .then(response => {
	        if (response.data.length === 0) {
                $scope.noGroups = true;
            }
            // for displaying data in 3 columns
            for (i = 0; i < response.data.length; i++) {
                if (i % 3 == 0) {
                    $scope.groups1.push(response.data[i]);
                } else if ((i + 2) % 3 == 0) {
                    $scope.groups2.push(response.data[i]);
                } else {
                    $scope.groups3.push(response.data[i]);
                }
            }
	    })
	    .finally(function() {
            // called no matter success or failure
            $scope.loading = false;
        });

	// New group dialog
	$scope.addGroup = function(ev) {
	    $mdDialog.show({
	      controller: AddGroupDialogController,
	      templateUrl: 'add-group-dialog.tmpl.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose: true,
	      fullscreen: true // Only for -xs, -sm breakpoints.
	    })
	    .then(function(answer) {
	      // ok
	    }, function() {
	      // cancel
	    });
	};

});

// Controller in: dashboard.general-activity.html
app.controller('DashboardGeneralActivityCtrl', function($rootScope, $scope, $http, moment) {

	$http.get(`${resourceUri}/auth/activities/find-all-external`)
		.then(response => {
			$scope.activities = response.data;
		}).finally(function() {

		});

});

// Controller in: groups.html
app.controller('GroupsCtrl', function($rootScope, $scope, $http, $state, $mdDialog) {

	$rootScope.isLoading = true;
	$scope.loading1 = true;
	$scope.groups = [];

	$scope.getMatches = function(searchText) {
	    return $http.get(`${resourceUri}/auth/groups/search/${searchText}`)
          .then(response => {
              // Map the response object to the data object.
              return response.data;
          });
	};

    $rootScope.setAuthUser
        .then(() => $http.get(`${resourceUri}/auth/groups/${$rootScope.user.email}`))
		.then(response => {
//		    console.log(response.data);
			$scope.groups = response.data;
		})
		.finally(function() {
		    // called no matter success or failure
		    $scope.loading1 = false;
		    $rootScope.isLoading = false;
		});

	$scope.joinGroup = function(idGroup) {
	    $rootScope.setAuthUser
            .then(() => $http.post(`${resourceUri}/auth/groups/${idGroup}/join/${$rootScope.user.email}`))
            .then(response => {
                $state.go("group.general", { idGroup: idGroup }, {});
            });
	}

	// New group dialog
	$scope.addGroup = function(ev) {
	    $mdDialog.show({
	      controller: AddGroupDialogController,
	      templateUrl: 'add-group-dialog.tmpl.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose: true,
	      fullscreen: true // Only for -xs, -sm breakpoints.
	    })
	    .then(function(answer) {
	      // ok
	    }, function() {
	      // cancel
	    });
	};

});

// Controller in: workshops.html
app.controller('WorkshopsCtrl', function($rootScope, $scope, $http) {

	$rootScope.isLoading = true;
	$scope.loading1 = true;

	$http.get(`${resourceUri}/auth/workshops/upcoming`)
		.then(response => { $scope.workshops = response.data; })
		.finally(function() {
		    // called no matter success or failure
		    $scope.loading1 = false;
		    $rootScope.isLoading = $scope.loading1;
		});

});

// Controller in: group-out.html
app.controller('GroupOutCtrl', function($rootScope, $scope, $http, $state, $stateParams) {

	$rootScope.isLoading = true;

	// Injects the group object in the parent scope
	$rootScope.setAuthUser
	    .then(() => $http.get(`${resourceUri}/auth/groups/${$stateParams.idGroup}/${$rootScope.user.email}`))
		.then(response => {
			$scope.group = response.data;
		}).finally(function() {
		    // called no matter success or failure
			$rootScope.isLoading = false;
		});

	$scope.joinGroup = function(idGroup) {
	    $rootScope.setAuthUser
	        .then(() => $http.post(`${resourceUri}/auth/groups/${idGroup}/join/${$rootScope.user.email}`))
			.then(response => {
			    console.log(response);
			    console.log(idGroup);
				$state.go("group.general", { idGroup: idGroup }, {});
			});
	}

});

// Controller in: subgroup-out.html
app.controller('SubgroupOutCtrl', function($rootScope, $scope, $http, $state, $stateParams) {

	$rootScope.isLoading = true;

	// Injects the subgroup object in the parent scope
	$rootScope.setAuthUser
	    .then(() => $http.get(`${resourceUri}/auth/subgroups/${$stateParams.idSubgroup}/${$rootScope.user.email}`))
		.then(response => {
			$scope.subgroup = response.data;
			$scope.subgroup.description = decodeURIComponent($scope.subgroup.description);
		}).finally(function() {
		    // called no matter success or failure
			$rootScope.isLoading = false;
		});

	$scope.joinSubgroup = function(idSubGroup) {
	    $rootScope.setAuthUser
	        .then(() => $http.post(`${resourceUri}/auth/subgroups/${idSubGroup}/join/${$rootScope.user.email}`))
			.then(response => {
				$state.go("subgroup.general", { idSubgroup: idSubGroup }, {});
			});
	}

});

// Controller in: workshop-out.html
app.controller('WorkshopOutCtrl', function($rootScope, $scope, $http, $stateParams) {

    $rootScope.setAuthUser
        .then(() => $http.get(`${resourceUri}/auth/workshops/${$stateParams.idWorkshop}/${$rootScope.user.email}`))
        .then(response => {
            $scope.workshop = response.data;
            $scope.workshop.description = decodeURIComponent($scope.workshop.description);
        })
        .finally(function() {
            // called no matter success or failure
        });

});


/*========== Settings controllers ==========*/

// Controller in: settings.profile.html
app.controller('SettingsProfileCtrl', function($rootScope, $scope, $http, $stateParams, $state, $mdToast) {
	var self = this;

	$scope.countries = countries;

	$rootScope.setAuthUser
	    .then(() => $http.get(`${resourceUri}/auth/fabbers/me/profile/${$rootScope.user.email}`))
	    .then(response => {
	        $scope.fabber = response.data;
	    })
	    .finally(function() {
            // called no matter success or failure
        });


	$scope.submit = function() {
		$rootScope.setAuthUser
	    	.then(() => $http.put(`${resourceUri}/auth/fabbers/me/update/${$rootScope.user.email}`, {
                    isFabAcademyGrad: $scope.fabber.isFabAcademyGrad,
                    fabAcademyGradYear: $scope.fabber.isFabAcademyGrad ? $scope.fabber.fabAcademyGradYear : null,
                    country: $scope.fabber.country,
//                    mainQuote: $scope.fabber.mainQuote,
//                    weekGoal: $scope.fabber.weekGoal,
//                    labId: $scope.newLab ? self.selectedLab.idLab : $scope.fabber.labId
             }))
            .then(response => {
                console.log("saved!");
                // update user object in $rootScope
                $rootScope.user = response.data;
                $rootScope.user.hasAdminGeneralRole = $rootScope.user.authorities.find(x => x === 'ROLE_ADMIN_GENERAL');
                $rootScope.user.hasAdminLabRole = $rootScope.user.authorities.find(x => x === 'ROLE_ADMIN_LAB');

                $mdToast.show(
                  $mdToast.simple()
                    .textContent('Info updated!')
                    .position("bottom right")
                    .hideDelay(1500)
                );
                // reload current state
                $state.go($state.current, {}, {reload: true});
            },
            function errorCallback(response) {
                $mdToast.show(
                  $mdToast.simple()
                    .textContent('Something went wrong :(')
                    .position("bottom right")
                    .hideDelay(1500)
                );
            });
	};

});



/*========== Fabber controllers ==========*/

// Controller in: fabber.html
app.controller('FabberCtrl', function($scope, $http, $stateParams) {

	// Injects the fabber object in the parent scope
	$http.get(`${resourceUri}/auth/fabbers/${$stateParams.idFabber}`)
		.then(response => {
			$scope.fabberLocal = response.data;
		}).finally(function() {
		    // called no matter success or failure
		});

});

// Controller in: fabber.groups.html
app.controller('FabberGroupsCtrl', function($scope, $http, $stateParams, $state) {

	$scope.groups1 = [];
	$scope.groups2 = [];
	$scope.groups3 = [];

	$http.get(`${resourceUri}/auth/groups/find-all-fabber/${$stateParams.idFabber}`)
		.then(function(response) {
			if (response.data.length === 0) {
				$scope.noGroups = true;
			}
			// for displaying data in 3 columns
			for (i = 0; i < response.data.length; i++) {
				if (i % 3 == 0) {
					$scope.groups1.push(response.data[i]);
				} else if ((i + 2) % 3 == 0) {
					$scope.groups2.push(response.data[i]);
				} else {
					$scope.groups3.push(response.data[i]);
				}
			}
		}).finally(function() {
		    // called no matter success or failure
		    $scope.loading = false;
		});

	// New group dialog
	$scope.addGroup = function(ev) {
	    $mdDialog.show({
	      controller: AddGroupDialogController,
	      templateUrl: 'add-group-dialog.tmpl.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose: true,
	      fullscreen: true // Only for -xs, -sm breakpoints.
	    })
	    .then(function(answer) {
	      // ok
	    }, function() {
	      // cancel
	    });
	};

});

// Controller in: fabber.activity.html
app.controller('FabberActivityCtrl', function($scope, $http, $stateParams, $state) {

});


//========== Group controllers ==========

// Controller in: group.html
app.controller('GroupCtrl', function($scope, $http, $stateParams) {

});

// Controller in: group.general.html
app.controller('GroupGeneralCtrl', function($scope, $http, $stateParams, $mdDialog) {

	// New subgroup dialog
	$scope.addSubgroup = function(ev) {
	    $mdDialog.show({
	      controller: AddSubgroupDialogController,
	      templateUrl: 'add-subgroup-dialog.tmpl.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose: true,
	      fullscreen: true // Only for -xs, -sm breakpoints.
	    })
	    .then(function(answer) {
	      // ok
	    }, function() {
	      // cancel
	    });
	};

});

// Controller in: group.activity.html
app.controller('GroupActivityCtrl', function($scope, $http, moment) {

	$http.get(`${resourceUri}/auth/activities/group/${$scope.group.idGroup}`)
		.then(response => {
			$scope.activities = response.data;
		}).finally(function() {

		});

});

// Controller in: group.members.html
app.controller('GroupMembersCtrl', function($rootScope, $scope, $http, $state, $mdDialog, $mdToast, moment) {

	// Invite member dialog
	$scope.addMember = function(ev) {
	    $mdDialog.show({
	      locals: { group: $scope.group }, // passing data to dialog
	      controller: AddGroupMemberDialogController,
	      templateUrl: 'add-group-member-dialog.tmpl.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose: true,
	      fullscreen: true // Only for -xs, -sm breakpoints.
	    })
	    .then(function(answer) {
	    	if (answer === 'ok') {
	    		// reload current state
	    		$state.go($state.current, {}, { reload: true });
	    	}
	    }, function() {
	      // cancel
	    });
	};

	$scope.leave = function(ev) {
		var confirm = $mdDialog.confirm()
            // .title('Are you sure you want to leave this group?')
            .textContent($scope.group.members.length > 1 ?
                            'Are you sure you want to leave this group?' :
                            'You are the last member. If you leave, the group will disappear.')
            .ariaLabel('Confirmation')
            .targetEvent(ev)
            .ok('Leave')
            .cancel('Cancel');

		$mdDialog.show(confirm)
            .then(() => {
                $rootScope.setAuthUser
                    .then(() => $http.post(`${resourceUri}/auth/groups/${$scope.group.idGroup}/leave/${$rootScope.user.email}`, { })
                        .then(function successCallback(response) {
                            // redirect
                            $state.go("groups", {}, {reload: true});
                        }, function errorCallback(response) {
                            $mdToast.show(
                              $mdToast.simple()
                                .textContent("Something went wrong :(")
                                .position("bottom right")
                                .hideDelay(1500)
                            );
                        }));
                }, () => {
                  // canceled
                });
	};

	$scope.nameCoordinator = function(item) {
	    $rootScope.setAuthUser
            .then(() => $http.post(`${resourceUri}/auth/groups/${$scope.group.idGroup}/name-coordinator/${$rootScope.user.email}`, JSON.stringify(item))
                .then(function successCallback(response) {
                    // redirect
                    $state.go($state.current, {}, { reload: true });
                }, function errorCallback(response) {
                    $mdToast.show(
                      $mdToast.simple()
                        .textContent("Something went wrong :(")
                        .position("bottom right")
                        .hideDelay(1500)
                    );
                }));
	};

	$scope.removeMember = function(ev, item) {
		var confirm = $mdDialog.confirm()
            // .title('Are you sure you want to leave this group?')
            .textContent('Are you sure you want to remove this member?')
            .ariaLabel('Confirmation')
            .targetEvent(ev)
            .ok('Remove')
            .cancel('Cancel');

		$mdDialog.show(confirm)
            .then(() => {
                $rootScope.setAuthUser
                    .then(() => $http.delete(`${resourceUri}/auth/groups/${$scope.group.idGroup}/members/${item.idGroupMember}/${$rootScope.user.email}`)
                          .then(function successCallback(response) {
                              // redirect
                              $state.go($state.current, {}, { reload: true });
                          }, function errorCallback(response) {
                              $mdToast.show(
                                $mdToast.simple()
                                  .textContent("Something went wrong :(")
                                  .position("bottom right")
                                  .hideDelay(1500)
                              );
                          }));
            }, function() {
              // canceled
            });
	};

});

// Controller in: group.subgroups.html
app.controller('GroupSubgroupsCtrl', function($rootScope, $scope, $http, $state, $mdDialog, $mdToast) {

	// New subgroup dialog
	$scope.addSubgroup = function(ev) {
	    $mdDialog.show({
	      controller: AddSubgroupDialogController,
	      templateUrl: 'add-subgroup-dialog.tmpl.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose: true,
	      fullscreen: true // Only for -xs, -sm breakpoints.
	    })
	    .then(function(answer) {
	      // ok
	    }, function() {
	      // cancel
	    });
	};

	$scope.removeSubgroup = function(ev, item) {
		var confirm = $mdDialog.confirm()
            // .title('Are you sure you want to leave this group?')
            .textContent('Are you sure you want to remove this subgroup?')
            .ariaLabel('Confirmation')
            .targetEvent(ev)
            .ok('Remove')
            .cancel('Cancel');

		$mdDialog.show(confirm)
            .then(function() {
                $rootScope.setAuthUser
                    .then(() => $http.delete(`${resourceUri}/auth/subgroups/${item.idSubGroup}/${$rootScope.user.email}`, {})
                          .then(function successCallback(response) {
                              // redirect
                              $state.go($state.current, {}, { reload: true });
                          }, function errorCallback(response) {
                              $mdToast.show(
                                $mdToast.simple()
                                  .textContent("Something went wrong :(")
                                  .position("bottom right")
                                  .hideDelay(1500)
                              );
                          }));
            }, function() {
              // canceled
            });
	};

});

// Controller in: group.settings.general.html
app.controller('GroupSettingsGeneralCtrl', function($rootScope, $scope, $http, $state, $mdToast, $mdDialog, Upload, cloudinary) {
	$scope._group = {};
	$scope._group.name = $scope.group.name;
	$scope._group.description = decodeURIComponent($scope.group.description);
	$scope._group.reunionDay = $scope.group.reunionDay;
	if ($scope.group.reunionTime) {
		$scope._group.reunionTimeHour = $scope.group.reunionTime.length == 7 ? parseInt($scope.group.reunionTime.substring(0, 1)) :  parseInt($scope.group.reunionTime.substring(0,2));
		$scope._group.reunionTimeMinutes = $scope.group.reunionTime.length == 7 ? parseInt($scope.group.reunionTime.substring(2, 4)) :  parseInt($scope.group.reunionTime.substring(3,5));
		$scope._group.reunionTimeMeridian = $scope.group.reunionTime.length == 7 ? $scope.group.reunionTime.substring(5, 7) :  $scope.group.reunionTime.substring(6,8);
	} else {
		$scope._group.reunionTimeHour = null;
		$scope._group.reunionTimeMinutes = null;
		$scope._group.reunionTimeMeridian = null;
	}
	$scope._group.mainUrl = $scope.group.mainUrl;
	$scope._group.secondaryUrl = $scope.group.secondaryUrl;
	$scope._group.symbioUrl = $scope.group.symbioUrl;
	$scope._group.photoUrl = $scope.group.photoUrl;

	$scope.submit = function() {
		console.log($scope._group);

		// avoids error when minutes are 0
		var parsedMinutes = $scope._group.reunionTimeMinutes === 0 ? $scope._group.reunionTimeMinutes + '0' : $scope._group.reunionTimeMinutes;

		// submit data
		$http.put(`${resourceUri}/auth/groups/${$scope.group.idGroup}`, {
			name: $scope._group.name,
			description: encodeURIComponent($scope._group.description),
			reunionDay: $scope._group.reunionDay,
			reunionTime: $scope._group.reunionTimeHour != null && $scope._group.reunionTimeMinutes != null && $scope._group.reunionTimeMeridian != null ? $scope._group.reunionTimeHour + ":" + parsedMinutes + " " + $scope._group.reunionTimeMeridian : null,
			mainUrl: $scope._group.mainUrl,
			secondaryUrl: $scope._group.secondaryUrl,
			symbioUrl: $scope._group.symbioUrl,
			photoUrl: $scope._group.photoUrl
		}).then(function successCallback(response) {
			console.log("saved!");
			$mdToast.show(
		      $mdToast.simple()
		        .textContent('Group updated!')
		        .position("bottom right")
		        .hideDelay(1500)
			);

			$state.go("group.general", { idGroup: $scope.group.idGroup }, { reload: true });
		}, function errorCallback(response) {
			$mdToast.show(
		      $mdToast.simple()
		        .textContent('Something went wrong :(')
		        .position("bottom right")
		        .hideDelay(1500)
			);
		});
	};

	$scope.delete = function(ev) {
		var confirm = $mdDialog.confirm()
	        .title('Are you sure you want to delete this group?')
	        .textContent('All of the data including subgroups, workshops and members associated with this instance will be permanently lost.')
	        .ariaLabel('Confirmation')
	        .targetEvent(ev)
	        .ok('Delete')
	        .cancel('Cancel');

		$mdDialog.show(confirm)
            .then(function() {
                $http.delete(`${resourceUri}/auth/groups/${$scope.group.idGroup}`)
                    .then(function successCallback(response) {
                        console.log("deleted!");
                        $mdToast.show(
                          $mdToast.simple()
                            .textContent('Group deleted!')
                            .position("bottom right")
                            .hideDelay(1500)
                        );
                        $state.go("groups", {}, {});
                    }, function errorCallback(response) {
                        $mdToast.show(
                              $mdToast.simple()
                                .textContent('Something went wrong :(')
                                .position("bottom right")
                                .hideDelay(1500)
                            );
                    });
            }, function() {

            });
	};

	$scope.uploadNewPicture = function(file) {
		$rootScope.isLoading = true;
		var uploadInProgressToast = $mdToast.simple()
                                        .textContent('Uploading image. Please wait...')
                                        .position("bottom right")
                                        .hideDelay(10000);
        $mdToast.show(uploadInProgressToast);

		Upload.upload({
            url: `https:\/\/api.cloudinary.com/v1_1/${cloudinary.config().cloud_name}/upload`,
            skipAuthorization: true, // to not send Authorization header and allow upload to cloudinary server
            data: {
            	upload_preset: cloudinary.config().upload_preset,
            	file: file
            }
        }).then(function(response) {
            //console.log('Success ' + response.config.data.file.name + ' uploaded. Response: ' + response.data);
            //console.log(response.data);
            $scope.group.photoUrl = response.data.public_id + '.png';

            // update group
    		$http.put(`${resourceUri}/auth/groups/${$scope.group.idGroup}/update-avatar`, {
    			photoUrl: $scope.group.photoUrl
    		})
    		.then(function successCallback(response) {
    			console.log("URL set in model!");

    			$mdToast.hide(uploadInProgressToast);
    			$rootScope.isLoading = false;

    			$mdToast.show(
    		      $mdToast.simple()
    		        .textContent('Avatar updated!')
    		        .position("bottom right")
    		        .hideDelay(1500)
    			);

    			// reload current state
    			$state.go($state.current, {}, {reload: true});
    		}, function errorCallback(response) {
    			$rootScope.isLoading = false;

    			$mdToast.show(
    		      $mdToast.simple()
    		        .textContent('Something went wrong during file upload :(')
    		        .position("bottom right")
    		        .hideDelay(1500)
    			);
    		});

        }, function(response) {
            console.log('Error status: ' + response.status);
            console.log(response);

            $rootScope.isLoading = false;

            $mdToast.show(
  		      $mdToast.simple()
  		        .textContent('Something went wrong during file upload :(')
  		        .position("bottom right")
  		        .hideDelay(1500)
  			);
        }, function(evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '%');
        });
	};

});


//========== Subgroup controllers ==========

// Controller in: subgroup.html
app.controller('SubgroupCtrl', function($scope, $http, $stateParams, $state) {

});

// Controller in: subgroup.general.html
app.controller('SubgroupGeneralCtrl', function($scope, $http, $stateParams) {

});

// Controller in: subgroup.activity.html
app.controller('SubgroupActivityCtrl', function($scope, $http, moment) {

	$http.get(`${resourceUri}/auth/activities/subgroup/${$scope.subgroup.idSubGroup}`)
		.then(function(response) {
			$scope.activities = response.data;
		}).finally(function() {

		});

});

//Controller in: subgroup.members.html
app.controller('SubgroupMembersCtrl', function($rootScope, $scope, $http, $state, $mdDialog, $mdToast, moment) {

	$scope.leave = function(ev) {
		var confirm = $mdDialog.confirm()
            // .title('Are you sure you want to leave this group?')
            .textContent($scope.subgroup.members.length > 1 ?
                        'Are you sure you want to leave this subgroup?' :
                        'You are the last member. If you leave, the subgroup will disappear.')
            .ariaLabel('Confirmation')
            .targetEvent(ev)
            .ok('Leave')
            .cancel('Cancel');

		$mdDialog.show(confirm)
            .then(function() {
                $rootScope.setAuthUser
                    .then(() => $http.post(`${resourceUri}/auth/subgroups/${$scope.subgroup.idSubGroup}/leave/${$rootScope.user.email}`, {})
                          .then(function successCallback(response) {
                              // redirect
                              $state.go("group.general", { idGroup: $scope.subgroup.groupId }, { reload: true });
                          }, function errorCallback(response) {
                              $mdToast.show(
                                $mdToast.simple()
                                  .textContent("Something went wrong :(")
                                  .position("bottom right")
                                  .hideDelay(1500)
                              );
                          }));
            }, function() {
              // canceled
            });
	};

	$scope.nameCoordinator = function(item) {
	    $rootScope.setAuthUser
	        .then(() => $http.post(`${resourceUri}/auth/subgroups/${$scope.subgroup.idSubGroup}/name-coordinator/${$rootScope.user.email}`, JSON.stringify(item))
                  .then(function successCallback(response) {
                      // redirect
                      $state.go($state.current, {}, { reload: true });
                  }, function errorCallback(response) {
                      $mdToast.show(
                        $mdToast.simple()
                          .textContent("Something went wrong :(")
                          .position("bottom right")
                          .hideDelay(1500)
                      );
                  }));
	};

	$scope.removeMember = function(ev, item) {
		var confirm = $mdDialog.confirm()
            // .title('Are you sure you want to leave this group?')
            .textContent('Are you sure you want to remove this member?')
            .ariaLabel('Confirmation')
            .targetEvent(ev)
            .ok('Remove')
            .cancel('Cancel');

		$mdDialog.show(confirm)
            .then(function() {
                $rootScope.setAuthUser
                    .then(() => $http.post(`${resourceUri}/auth/subgroups/${$scope.subgroup.idSubGroup}/delete-member/${$rootScope.user.email}`, JSON.stringify(item))
                          .then(function successCallback(response) {
                              // redirect
                              $state.go($state.current, {}, { reload: true });
                          }, function errorCallback(response) {
                              $mdToast.show(
                                $mdToast.simple()
                                  .textContent("Something went wrong :(")
                                  .position("bottom right")
                                  .hideDelay(1500)
                              );
                          }));
            }, function() {
              // canceled
            });
	};

});

// Controller in: subgroup.workshops.html
app.controller('SubgroupWorkshopsCtrl', function($scope, $http, $state, $mdDialog, $mdToast) {

	// New subgroup dialog
	$scope.addSubgroup = function(ev) {
	    $mdDialog.show({
	      controller: AddSubgroupDialogController,
	      templateUrl: 'add-subgroup-dialog.tmpl.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose: true,
	      fullscreen: true // Only for -xs, -sm breakpoints.
	    })
	    .then(function(answer) {
	      // ok
	    }, function() {
	      // cancel
	    });
	};

	$scope.removeWorkshop = function(ev, item) {
		var confirm = $mdDialog.confirm()
            // .title('Are you sure you want to leave this group?')
            .textContent('Are you sure you want to remove this workshop?')
            .ariaLabel('Confirmation')
            .targetEvent(ev)
            .ok('Remove')
            .cancel('Cancel');

		$mdDialog.show(confirm)
            .then(function() {
                // submit data
                $http.delete(`${resourceUri}/auth/workshops/${item.idWorkshop}`, {})
                .then(function successCallback(response) {
                    // redirect
                    $state.go($state.current, {}, { reload: true });
                }, function errorCallback(response) {
                    $mdToast.show(
                      $mdToast.simple()
                        .textContent("Something went wrong :(")
                        .position("bottom right")
                        .hideDelay(1500)
                    );
                });
            }, function() {
              // canceled
            });
	};

});


// Controller in: subgroup.settings.general.html
app.controller('SubgroupSettingsGeneralCtrl', function($rootScope, $scope, $http, $state, $mdToast, $mdDialog) {

	$scope._subgroup = {};
	$scope._subgroup.name = $scope.subgroup.name;
	$scope._subgroup.description = decodeURIComponent($scope.subgroup.description);
	$scope._subgroup.reunionDay = $scope.subgroup.reunionDay;
	if ($scope.subgroup.reunionTime) {
		$scope._subgroup.reunionTimeHour = $scope.subgroup.reunionTime.length == 7 ? parseInt($scope.subgroup.reunionTime.substring(0, 1)) :  parseInt($scope.subgroup.reunionTime.substring(0,2));
		$scope._subgroup.reunionTimeMinutes = $scope.subgroup.reunionTime.length == 7 ? parseInt($scope.subgroup.reunionTime.substring(2, 4)) :  parseInt($scope.subgroup.reunionTime.substring(3,5));
		$scope._subgroup.reunionTimeMeridian = $scope.subgroup.reunionTime.length == 7 ? $scope.subgroup.reunionTime.substring(5, 7) :  $scope.subgroup.reunionTime.substring(6,8);
	} else {
		$scope._subgroup.reunionTimeHour = null;
		$scope._subgroup.reunionTimeMinutes = null;
		$scope._subgroup.reunionTimeMeridian = null;
	}
	$scope._subgroup.mainUrl = $scope.subgroup.mainUrl;
	$scope._subgroup.secondaryUrl = $scope.subgroup.secondaryUrl;
	$scope._subgroup.photoUrl = $scope.subgroup.photoUrl;

	$scope.submit = function() {
		console.log($scope._subgroup);

		// avoids error when minutes are 0
		var parsedMinutes = $scope._subgroup.reunionTimeMinutes === 0 ? $scope._subgroup.reunionTimeMinutes + '0' : $scope._subgroup.reunionTimeMinutes;
		console.log(parsedMinutes);

		// submit data
		$http.put(`${resourceUri}/auth/subgroups/${$scope.subgroup.idSubGroup}`, {
                name: $scope._subgroup.name,
                description: encodeURIComponent($scope._subgroup.description),
                reunionDay: $scope._subgroup.reunionDay,
                reunionTime: $scope._subgroup.reunionTimeHour != null && $scope._subgroup.reunionTimeMinutes != null && $scope._subgroup.reunionTimeMeridian != null ? $scope._subgroup.reunionTimeHour + ":" + parsedMinutes + " " + $scope._subgroup.reunionTimeMeridian : null,
                mainUrl: $scope._subgroup.mainUrl,
                secondaryUrl: $scope._subgroup.secondaryUrl,
                photoUrl: $scope._subgroup.photoUrl
            })
            .then(function successCallback(response) {
                console.log("saved!");
                $mdToast.show(
                  $mdToast.simple()
                    .textContent('Subgroup updated!')
                    .position("bottom right")
                    .hideDelay(1500)
                );

                $state.go("subgroup.general", { idSubGroup: $scope.subgroup.idSubGroup }, { reload: true });
            },
            function errorCallback(response) {
                $mdToast.show(
                  $mdToast.simple()
                    .textContent('Something went wrong :(')
                    .position("bottom right")
                    .hideDelay(1500)
                );
            });
	};

	$scope.delete = function(ev) {
		var confirm = $mdDialog.confirm()
	        .title('Are you sure you want to delete this subgroup?')
	        .textContent('All of the data and workshops associated with this instance will be permanently lost.')
	        .ariaLabel('Confirmation')
	        .targetEvent(ev)
	        .ok('Delete')
	        .cancel('Cancel');

		$mdDialog.show(confirm)
            .then(function() {
                $rootScope.setAuthUser
                    .then(() => $http.delete(`${resourceUri}/auth/subgroups/${$scope.subgroup.idSubGroup}/${$rootScope.user.email}`)
                          .then(function successCallback(response) {
                              console.log("deleted!");
                              $mdToast.show(
                                $mdToast.simple()
                                  .textContent('Subgroup deleted!')
                                  .position("bottom right")
                                  .hideDelay(1500)
                              );
                              $state.go("group.general", { idGroup: $scope.subgroup.groupId }, {});
                          }, function errorCallback(response) {
                              $mdToast.show(
                                $mdToast.simple()
                                  .textContent('Something went wrong :(')
                                  .position("bottom right")
                                  .hideDelay(1500)
                              );
                          }));
            }, function() {
              // canceled
            });
	};

});

// Controller in: subgroup.add-workshop.html
app.controller('SubgroupAddWorkshopCtrl', function($rootScope, $scope, $http, $stateParams, $state, $window, $mdToast) {
	var self = this;

	$scope.address = {
	    name: '',
	    place: '',
	    components: {
	      placeId: '',
	      streetNumber: '',
	      street: '',
	      city: '',
	      state: '',
	      countryCode: '',
	      country: '',
	      postCode: '',
	      district: '',
	      location: {
	        lat: '',
	        long: ''
	      }
	    }
	};

	// initialize checkbox attributes
	$scope._workshop = {};
	$scope._workshop.isPaid = false;
	// restrict min-date for date pickers
	$scope.today = new Date();

	$scope.getAppMatches = function(searchText) {
	    return $http.get(`${resourceUri}/auth/locations/search/${searchText}`)
                  .then(function(response) {
                      // Map the response object to the data object.
                      return response.data;
                  });
	};

	$scope.submit = function() {
//		console.log($scope._workshop);
		$rootScope.setAuthUser
		    .then(() => $http.post(`${resourceUri}/auth/workshops/${$rootScope.user.email}`, {
		        type: $scope._workshop.type,
                name: $scope._workshop.name,
                description: encodeURIComponent($scope._workshop.description),
                startDate: $scope._workshop.startDate.getDate() + "-" + ($scope._workshop.startDate.getMonth() + 1) + "-" + $scope._workshop.startDate.getFullYear(),
                startTime: $scope._workshop.startTimeHours + ":" + $scope._workshop.startTimeMinutes + " " + $scope._workshop.startTimeMeridian,  // time format for api
                endDate: $scope._workshop.endDate.getDate() + "-" + ($scope._workshop.endDate.getMonth() + 1) + "-" + $scope._workshop.endDate.getFullYear(),
                endTime: $scope._workshop.endTimeHours + ":" + $scope._workshop.endTimeMinutes + " " + $scope._workshop.endTimeMeridian,
                isPaid: $scope._workshop.isPaid,
                price: $scope._workshop.isPaid ? $scope._workshop.price : null,
                currency: $scope._workshop.isPaid ? $scope._workshop.currency : null,
                facebookUrl: $scope._workshop.facebookUrl,
                ticketsUrl: $scope._workshop.ticketsUrl,
                // dependencies
                subGroupId: $stateParams.idSubgroup, // parent
                locationId: !$scope._workshop.isNewLocation ? self.selectedLocation.idLocation : null,
                locationAddress: $scope._workshop.isNewLocation ? $scope.address.components.street + " " + $scope.address.components.streetNumber : null,
                locationCity: $scope._workshop.isNewLocation ? $scope.address.components.city : null,
                locationCountry: $scope._workshop.isNewLocation ? $scope.address.components.country : null,
                locationLatitude: $scope._workshop.isNewLocation ? $scope.address.components.location.lat : null,
                locationLongitude: $scope._workshop.isNewLocation ? $scope.address.components.location.long : null
            })
            .then(function successCallback(response) {
                console.log("saved!");
                $mdToast.show(
                  $mdToast.simple()
                    .textContent('Workshop added!')
                    .position("bottom right")
                    .hideDelay(1500)
                );

                $state.go("workshop.general", { idWorkshop: response.data.idWorkshop }, {});
            },
            function errorCallback(response) {
                $mdToast.show(
                  $mdToast.simple()
                    .textContent('Something went wrong :(')
                    .position("bottom right")
                    .hideDelay(1500)
                );
            }));
	  };

	  $scope.goBack = function() {
		  $window.history.back();
	  };

});



/*========== Workshop controllers ==========*/


// Controller in: workshop.html
app.controller('WorkshopCtrl', function($scope, $http, $stateParams, $state) {

});

// Controller in: workshop.general.html
app.controller('WorkshopGeneralCtrl', function($scope, $http, $stateParams) {

});

// Controller in: workshop.management.general.html
app.controller('WorkshopManagementGeneralCtrl', function($scope, $http, $stateParams, $state, $mdDialog, $mdToast) {
	var self = this;
	$scope.address = {
	    name: '',
	    place: '',
	    components: {
	      placeId: '',
	      streetNumber: '',
	      street: '',
	      city: '',
	      state: '',
	      countryCode: '',
	      country: '',
	      postCode: '',
	      district: '',
	      location: {
	        lat: '',
	        long: ''
	      }
	    }
	};

	// restrict min-date for date pickers
	$scope.today = new Date();

	$scope._workshop = {};
	$scope._workshop.name = $scope.workshop.name;
	$scope._workshop.description = decodeURIComponent($scope.workshop.description);
	$scope._workshop.startDate = new Date(parseInt($scope.workshop.startDate.substring(6, 10)), parseInt($scope.workshop.startDate.substring(3, 5)) - 1, parseInt($scope.workshop.startDate.substring(0, 2)));
	$scope._workshop.startTimeHours = $scope.workshop.startTime.length == 7 ? parseInt($scope.workshop.startTime.substring(0, 1)) : parseInt($scope.workshop.startTime.substring(0,2));
	$scope._workshop.startTimeMinutes = $scope.workshop.startTime.length == 7 ? parseInt($scope.workshop.startTime.substring(2, 4)) : parseInt($scope.workshop.startTime.substring(3,5));
	$scope._workshop.startTimeMeridian = $scope.workshop.startTime.length == 7 ? $scope.workshop.startTime.substring(5, 7) : $scope.workshop.startTime.substring(6,8);
	$scope._workshop.endDate = new Date(parseInt($scope.workshop.endDate.substring(6, 10)), parseInt($scope.workshop.endDate.substring(3, 5)) - 1, parseInt($scope.workshop.endDate.substring(0, 2)));
	$scope._workshop.endTimeHours = $scope.workshop.endTime.length == 7 ? parseInt($scope.workshop.endTime.substring(0, 1)) : parseInt($scope.workshop.endTime.substring(0,2));
	$scope._workshop.endTimeMinutes = $scope.workshop.endTime.length == 7 ? parseInt($scope.workshop.endTime.substring(2, 4)) : parseInt($scope.workshop.endTime.substring(3,5));
	$scope._workshop.endTimeMeridian = $scope.workshop.endTime.length == 7 ? $scope.workshop.endTime.substring(5, 7) : $scope.workshop.endTime.substring(6,8);
	$scope._workshop.isPaid = $scope.workshop.isPaid;
	$scope._workshop.price = $scope.workshop.price;
	$scope._workshop.currency = $scope.workshop.currency;
	$scope._workshop.facebookUrl = $scope.workshop.facebookUrl;
	$scope._workshop.ticketsUrl = $scope.workshop.ticketsUrl;

	$scope.getAppMatches = function(searchText) {
	    return $http
	      .get(`${resourceUri}/auth/locations/search/${searchText}`)
	      .then(function(response) {
	    	  // Map the response object to the data object.
	    	  return response.data;
	      });
	};

	$scope.submit = function() {
//		console.log($scope._workshop);
		// submit data
		$http.put(`${resourceUri}/auth/workshops/${$scope.workshop.idWorkshop}`, {
			name: $scope._workshop.name,
			description: encodeURIComponent($scope._workshop.description),
			startDate: $scope._workshop.startDate.getDate() + "-" + ($scope._workshop.startDate.getMonth() + 1) + "-" + $scope._workshop.startDate.getFullYear(),
			startTime: $scope._workshop.startTimeHours + ":" + $scope._workshop.startTimeMinutes + " " + $scope._workshop.startTimeMeridian,  // time format for api
			endDate: $scope._workshop.endDate.getDate() + "-" + ($scope._workshop.endDate.getMonth() + 1) + "-" + $scope._workshop.endDate.getFullYear(),
			endTime: $scope._workshop.endTimeHours + ":" + $scope._workshop.endTimeMinutes + " " + $scope._workshop.endTimeMeridian,
			isPaid: $scope._workshop.isPaid,
			price: $scope._workshop.isPaid ? $scope._workshop.price : null,
			currency: $scope._workshop.isPaid ? $scope._workshop.currency : null,
			facebookUrl: $scope._workshop.facebookUrl,
			ticketsUrl: $scope._workshop.ticketsUrl,
			// dependencies
			subGroupId: $stateParams.idSubgroup, // parent
			locationId: !$scope._workshop.isNewLocation ? self.selectedLocation.idLocation : null,
			locationAddress: $scope._workshop.isNewLocation ? $scope.address.components.street + " " + $scope.address.components.streetNumber : null,
			locationCity: $scope._workshop.isNewLocation ? $scope.address.components.city : null,
			locationCountry: $scope._workshop.isNewLocation ? $scope.address.components.country : null,
			locationLatitude: $scope._workshop.isNewLocation ? $scope.address.components.location.lat : null,
			locationLongitude: $scope._workshop.isNewLocation ? $scope.address.components.location.long : null
		})
		.then(function successCallback(response) {
			console.log("saved!");
			$mdToast.show(
		      $mdToast.simple()
		        .textContent('Workshop updated!')
		        .position("bottom right")
		        .hideDelay(1500)
			);

			$state.go("workshop.general", { idWorkshop: $scope.workshop.idWorkshop }, { reload: true });
		},
		function errorCallback(response) {
			$mdToast.show(
		      $mdToast.simple()
		        .textContent('Something went wrong :(')
		        .position("bottom right")
		        .hideDelay(1500)
			);
		});
	};

	$scope.delete = function(ev) {
		var confirm = $mdDialog.confirm()
	        .title('Are you sure you want to delete this workshop?')
	        .textContent('All of the data associated with this instance will be permanently lost.')
	        .ariaLabel('Confirmation')
	        .targetEvent(ev)
	        .ok('Delete')
	        .cancel('Cancel');

		$mdDialog.show(confirm)
            .then(function() {
                $http.delete(`${resourceUri}/auth/workshops/${$scope.workshop.idWorkshop}`)
                    .then(function successCallback(response) {
                        console.log("deleted!");
                        $mdToast.show(
                          $mdToast.simple()
                            .textContent('Workshop deleted!')
                            .position("bottom right")
                            .hideDelay(1500)
                        );

                        $state.go("subgroup.general", { idSubgroup: $scope.workshop.subGroupId }, {});
                    }, function errorCallback(response) {
                        $mdToast.show(
                          $mdToast.simple()
                            .textContent('Something went wrong :(')
                            .position("bottom right")
                            .hideDelay(1500)
                        );
                    });

            }, function() {
              // canceled
            });
	};

});



/*========== Dialog controllers ==========*/


// Controller for: add-group-dialog.tmpl.html
function AddGroupDialogController($rootScope, $scope, $mdDialog, $http, $state, $mdToast) {

	$scope.actionsDisabled = false;

	$scope.hide = function() {
	    $mdDialog.hide();
	};

	$scope.cancel = function() {
	    $mdDialog.cancel();
	};

	$scope.submit = function() {
	    $scope.actionsDisabled = true;

	    $rootScope.setAuthUser
	        .then(() => $http.post(`${resourceUri}/auth/groups/${$rootScope.user.email}`, {
                name: $scope._group.name,
                description: encodeURIComponent($scope._group.description)
            }).then(response => {
                    console.log("saved!");
                    $mdToast.show(
                      $mdToast.simple()
                        .textContent('Group added!')
                        .position("bottom right")
                        .hideDelay(1500)
                    );
                    // pass data retrieved to parent controller
                    $mdDialog.hide(response.data);
                    // go to group state
                    $state.go("group.general", { idGroup: response.data.idGroup }, {});
                }, response => {
                    $mdToast.show(
                      $mdToast.simple()
                        .textContent('Something went wrong :(')
                        .position("bottom right")
                        .hideDelay(1500)
                    );
                }));
	  };
};

// Controller for: add-subgroup-dialog.tmpl.html
function AddSubgroupDialogController($rootScope, $scope, $mdDialog, $http, $stateParams, $state, $mdToast) {

	$scope.actionsDisabled = false;

	$scope.hide = function() {
	    $mdDialog.hide();
	};

	$scope.cancel = function() {
	    $mdDialog.cancel();
	};

	$scope.submit = function() {
	    $scope.actionsDisabled = true;

		$rootScope.setAuthUser
		    .then(() => $http.post(`${resourceUri}/auth/subgroups/${$rootScope.user.email}`, {
                name: $scope._subgroup.name,
                description: encodeURIComponent($scope._subgroup.description),
                groupId: $stateParams.idGroup // parent
            })
            .then(function successCallback(response) {
                console.log("saved!");
                $mdToast.show(
                  $mdToast.simple()
                    .textContent('Subgroup added!')
                    .position("bottom right")
                    .hideDelay(1500)
                );
                // pass data retrieved to parent controller
                $mdDialog.hide(response.data);
                // go to subgroup state
                $state.go("subgroup.general", { idSubgroup: response.data.idSubGroup }, {});
            },
            function errorCallback(response) {
                $mdToast.show(
                  $mdToast.simple()
                    .textContent('Something went wrong :(')
                    .position("bottom right")
                    .hideDelay(1500)
                );
            }));
	  };
};

// Controller for: add-group-member-dialog.tmpl.html
function AddGroupMemberDialogController($rootScope, $scope, $mdDialog, $http, $stateParams, $state, $mdToast, group) {

	$scope.group = group; // receiving data from parent controller

	$scope.hide = function() {
	    $mdDialog.hide();
	};

	$scope.cancel = function() {
	    $mdDialog.cancel();
	};

	$scope.answer = function(answer) {
		$mdDialog.hide(answer);
	};

	$scope.addMember = function(fabber) {
		$rootScope.isLoading = true;

		$http.post(`${resourceUri}/auth/groups/${$stateParams.idGroup}/members`, {
			fabberId: fabber.idFabber
		}).then(function successCallback(response) {
			console.log("added!");
			$mdToast.show(
		      $mdToast.simple()
		        .textContent('Member added!')
		        .position("bottom right")
		        .hideDelay(1500)
			);
			// pass data retrieved to parent controller
			//$mdDialog.hide(response.data);
			$scope.answer("ok");
			$rootScope.isLoading = false;
		}, function errorCallback(response) {
			$mdToast.show(
		      $mdToast.simple()
		        .textContent('Something went wrong :(')
		        .position("bottom right")
		        .hideDelay(1500)
			);
			$scope.answer("error");
			$rootScope.isLoading = false;
		});
	};

	$scope.sendInvitationEmail = function(email) {
		$http.post(`${resourceUri}/auth/groups/${$stateParams.idGroup}/members/send-invitation-email`, {
			email: email
		}).then(function successCallback(response) {
			console.log("sent invitation!");
			$mdToast.show(
		      $mdToast.simple()
		        .textContent('An email invitation has been sent!')
		        .position("bottom right")
		        .hideDelay(1500)
			);
			// pass data retrieved to parent controller
			$mdDialog.hide(response.data);
		}, function errorCallback(response) {
			$mdToast.show(
		      $mdToast.simple()
		        .textContent('Something went wrong :(')
		        .position("bottom right")
		        .hideDelay(1500)
			);
		});
	};

	$scope.getMatches = function(searchText) {
	    return $http
	      .get(`${resourceUri}/auth/groups/${$stateParams.idGroup}/members/autocomplete/${searchText}`)
	      .then(function(response) {
	    	  // Map the response object to the data object.
	    	  return response.data;
	      });
	};

	$scope.validateEmail = function(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(String(email).toLowerCase());
	}

};


//================= Custom filters =====================

app.filter('UTCToNow', ['moment', function (moment) {
    return function (input, format) {
       if(format) {
    	   return moment.utc(input).local().format('dddd, MMMM Do YYYY, h:mm:ss a');
       }
       else {
    	   return moment.utc(input).local();
       }
    };
}]);

app.filter('decodeURIComponent', function($window) {
    return $window.decodeURIComponent;
});


//================= Custom directives =====================

// Defining a custom directive for handling the user avatar
// extracted from: http://plnkr.co/edit/UHq23coTUSrwnMKq1Itv?p=preview
app.directive('userAvatar', ["avatarService", function(avatarService) {
	var controller = function ($scope) {
		$scope.$watch("mFabber", function(newValue, oldValue, scope) {
			if (newValue) {
				$scope.imageAvailable = false;
				if (!$scope.mFabber.avatar) {
					$scope.genericAvatar = avatarService.getAvatar($scope.mFabber);
				} else {
					$scope.imageAvailable = true;
				}
			}
        });
	};
	return {
		restrict: 'E',
		scope: {
			mFabber: '=fabber',
			avatarWidth: '@avatarW',
			avatarHeight: '@avatarH',
			avatarFontSize: '@avatarFontSize'
		},
		template: '<div class="generic-avatar" style="width: {{avatarWidth}}px; height: {{avatarHeight}}px;">' +
			'<div class="avatar-circle" style="background-color: {{genericAvatar.background}};"></div>' +
			'<span class="name" style="font-size: {{avatarFontSize}}px;">{{genericAvatar.initials}}</span>' +
			'<div class="img-avatar" data-ng-if="imageAvailable" style="background-image: url({{mFabber.avatar}})"></div>' +
			'</div>',
		controller: controller
	};
}])
.factory("avatarService", function() {
    var avatarService = function(fabber) {
        if (angular.equals(fabber, {})) return;

    	var colorCodes = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60",
    	                  "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22", "#e74c3c", "#95a5a6",
    	                  "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"];
		var i1 = "", i2 = "", nameArray = [];

		if (fabber.firstName && fabber.lastName) {
		    i1 = fabber.firstName.charAt(0).toUpperCase();
            i2 = fabber.lastName.charAt(0).toUpperCase();
		} else {
            i1 = fabber.name.charAt(0).toUpperCase();
            nameArray = fabber.name.split(" ");
            if (nameArray.length > 2) {
                i2 = nameArray[nameArray.length - 1].charAt(0).toUpperCase();
            } else {
                i2 = nameArray[1].charAt(0).toUpperCase();
            }
		}
		var initials = i1 + "" + i2;
		var charIndex = initials.charCodeAt(0) - 48,
	    	colourIndex = charIndex % 19;

		var background = colorCodes[colourIndex];
		return ({ "initials": initials, "background": background });
    }
    return {
      getAvatar: avatarService
    }
});

// Group avatar
app.directive('groupAvatar', ["groupAvatarService", "$sce", function (groupAvatarService, $sce) {
	var controller = function ($scope) {
		$scope.$watch("mGroup", function(newValue, oldValue, scope) {
			if (newValue) {
				$scope.imageAvailable = false;
				if (!$scope.mGroup.photoUrl) {
					$scope.genericAvatar = groupAvatarService.getAvatar($scope.mGroup);
				} else {
					$scope.imageAvailable = true;
					// create url with fit parameters
					//var fileName = $scope.mGroup.photoUrl.split("/").pop();
					//var url = "http://res.cloudinary.com/dymje6shc/image/upload/w_220,h_165,c_fit/" + fileName;

					//$scope.mGroup.photoUrlWithParameters = url;
					//console.log($scope.mGroup.photoUrlWithParameters);
				}
			}
        });
	};
	return {
		restrict: 'E',
		scope: {
			mGroup: '=group',
			avatarWidth: '@avatarW',
			avatarHeight: '@avatarH',
			avatarFontSize: '@avatarFontSize'
		},
		template: '<div ng-if="!imageAvailable" class="generic-avatar" style="width: {{avatarWidth}}px; height: {{avatarHeight}}px;">' +
				  	'<div class="avatar-squared" style="background-color: {{genericAvatar.background}};"></div>' +
				  	'<span class="name" style="font-size: {{avatarFontSize}}px;">{{genericAvatar.initials}}</span>' +
				  '</div>' +
				  '<div ng-if="imageAvailable" class="img-avatar">' +
				  	'<img ng-src="http://res.cloudinary.com/dymje6shc/image/upload/w_220,h_165,c_fit/{{mGroup.photoUrl}}" />' +
				  '</div>',
		controller: controller
	};
}])
.factory("groupAvatarService", function() {
    var groupAvatarService = function(group) {
        //group = group[0];

    	var colorCodes = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60",
    	                  "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22", "#e74c3c", "#95a5a6",
    	                  "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"];

		var i1 = "", nameArray = [];
		i1 = group.name.charAt(0).toUpperCase();

		var initials = i1;
		var charIndex = initials.charCodeAt(0) - 48,
	    	colourIndex = charIndex % 19;

		var background = colorCodes[colourIndex];
		return ({ "initials": initials, "background": background });
    }
    return {
      getAvatar: groupAvatarService
    }
});

/**
* Authentication service
*/
app.service("authService", function($http, $rootScope) {
    var authenticatedUser = null;

    const createOrUpdateUser = () => {
        return $http.get('/user')
            .then(response => {
                //console.log("jwt token value: ", response.data.idToken.tokenValue);
                $rootScope.jwtValue = response.data.idToken.tokenValue;
                return $rootScope.jwtValue;
            })
            .then(jwtValue => $http.post(`${resourceUri}/auth/fabbers/createOrUpdateUser`, { }, { headers: {'Authorization': `Bearer ${jwtValue}`} }))
            .then(appUser => {
                console.log("Returned app user after POST 'public/createOrUpdateUser': %s", JSON.stringify(appUser.data));
                authenticatedUser = appUser.data;
            });
    };

    const getAuthenticatedUser = () => authenticatedUser != null
                                        ? Promise.resolve(authenticatedUser)
                                        : createOrUpdateUser().then(() => authenticatedUser);
    return { createOrUpdateUser: createOrUpdateUser, getAuthenticatedUser: getAuthenticatedUser };
});
