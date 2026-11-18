import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
} from "remotion";

type NarrationCue = {
  start: number;
  end: number;
  text: string;
};

const cues: NarrationCue[] = [
  {
    start: 0,
    end: 148,
    text: "Три дні тому він подав рапорт: лікарі наполягали на стаціонарному обстеженні.",
  },
  {
    start: 148,
    end: 285,
    text: "У відповідь почув лише одне: «Чекай. Зараз не до цього».",
  },
  {
    start: 285,
    end: 459,
    text: "Він чекав. Біль посилювався. А рапорт так і не повернувся з резолюцією.",
  },
  {
    start: 459,
    end: 662,
    text: "На третій день йому сказали, що такого документа взагалі не надходило.",
  },
  {
    start: 662,
    end: 786,
    text: "Але в нього залишилася копія. І на ній був вхідний номер.",
  },
  {
    start: 786,
    end: 934,
    text: "Він надіслав фото адвокату. Той одразу попросив не видаляти жодного повідомлення.",
  },
  {
    start: 934,
    end: 1105,
    text: "Дата була. Підпис був. Та підтвердження, куди саме передали рапорт, не було.",
  },
  {
    start: 1105,
    end: 1228,
    text: "Адвокат почав перевіряти шлях документа. І знайшов дивну невідповідність.",
  },
  {
    start: 1228,
    end: 1327,
    text: "У журналі за цим номером значилося зовсім інше звернення.",
  },
  {
    start: 1327,
    end: 1560,
    text: "Два різні рапорти. Один номер. Одна дата. Такого збігу не мало бути.",
  },
  {
    start: 1560,
    end: 1667,
    text: "Військовий зрозумів: хтось дуже хотів, щоб його звернення зникло без сліду.",
  },
  {
    start: 1667,
    end: 1764,
    text: "І саме тоді на телефон прийшло повідомлення з невідомого номера.",
  },
  {
    start: 1764,
    end: 1895,
    text: "«Забери рапорт. Інакше матимеш проблеми».",
  },
  {
    start: 1895,
    end: 2019,
    text: "Він перечитав ці слова тричі. А потім зателефонував адвокату.",
  },
  {
    start: 2019,
    end: 2127,
    text: "Адвокат знову збільшив фото. Тепер його увагу привернула печатка.",
  },
  {
    start: 2127,
    end: 2230,
    text: "Вона виглядала справжньою. Але належала зовсім іншому підрозділу.",
  },
  {
    start: 2230,
    end: 2312,
    text: "Це вже не було схоже на звичайну помилку в документах.",
  },
  {
    start: 2312,
    end: 2438,
    text: "Адвокат зрозумів: хтось не просто загубив рапорт. Хтось залишив підказку.",
  },
  {
    start: 2438,
    end: 2561,
    text: "І тоді задзвонив телефон. На екрані — номер військової частини.",
  },
];

export const EpisodeNarration: React.FC = () => {
  const frame = useCurrentFrame();
  const cue = cues.find((item) => frame >= item.start && frame < item.end);

  const opacity = cue ? 1 : 0;

  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 30 }}>
      {/* Постійна назва епізоду */}
      <div
        style={{
          position: "absolute",
          top: 86,
          left: 68,
          padding: "12px 18px",
          backgroundColor: "rgba(8, 13, 18, 0.58)",
          borderLeft: "4px solid #b78b55",
          color: "rgba(255,255,255,0.82)",
          fontFamily: "Arial, sans-serif",
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: 3,
        }}
      >
        HELPUA24  /  СПРАВА № 01
      </div>

      {/* Закадровий текст */}
      {cue && (
        <div
          style={{
            position: "absolute",
            left: 64,
            right: 180,
            bottom: 440,
            padding: "22px 26px",
            background:
              "linear-gradient(110deg, rgba(7, 12, 17, 0.94), rgba(17, 24, 31, 0.84))",
            borderLeft: "5px solid #b78b55",
            borderRadius: 8,
            boxShadow: "0 16px 50px rgba(0,0,0,0.32)",
            opacity,
            transform: "translateY(0px)",
          }}
        >
          <div
            style={{
              marginBottom: 8,
              color: "#c9a575",
              fontFamily: "Arial, sans-serif",
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            РАПОРТ, ЯКОГО НІХТО НЕ БАЧИТЬ
          </div>
          <div
            style={{
              color: "#ffffff",
              fontFamily: "Arial, sans-serif",
              fontSize: 34,
              lineHeight: 1.22,
              fontWeight: 700,
              textShadow: "0 2px 8px rgba(0,0,0,0.45)",
            }}
          >
            {cue.text}
          </div>
        </div>
      )}

    </AbsoluteFill>
  );
};
