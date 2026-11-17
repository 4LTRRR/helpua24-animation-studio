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
    end: 154,
    text: "Три дні тому він подав рапорт: лікарі наполягали на стаціонарному обстеженні.",
  },
  {
    start: 154,
    end: 289,
    text: "У відповідь почув лише одне: «Чекай. Зараз не до цього».",
  },
  {
    start: 289,
    end: 402,
    text: "Він чекав. Біль посилювався. А рапорт так і не повернувся з резолюцією.",
  },
  {
    start: 402,
    end: 596,
    text: "На третій день йому сказали, що такого документа взагалі не надходило.",
  },
  {
    start: 596,
    end: 667,
    text: "Але в нього залишилася копія. І на ній був вхідний номер.",
  },
  {
    start: 667,
    end: 789,
    text: "Він надіслав фото адвокату. Той одразу попросив не видаляти жодного повідомлення.",
  },
  {
    start: 789,
    end: 938,
    text: "Дата була. Підпис був. Та підтвердження, куди саме передали рапорт, не було.",
  },
  {
    start: 938,
    end: 1110,
    text: "Адвокат почав перевіряти шлях документа. І знайшов дивну невідповідність.",
  },
  {
    start: 1110,
    end: 1232,
    text: "У журналі за цим номером значилося зовсім інше звернення.",
  },
  {
    start: 1232,
    end: 1389,
    text: "Два різні рапорти. Один номер. Одна дата. Такого збігу не мало бути.",
  },
  {
    start: 1389,
    end: 1564,
    text: "Військовий зрозумів: хтось дуже хотів, щоб його звернення зникло без сліду.",
  },
  {
    start: 1564,
    end: 1710,
    text: "І саме тоді на телефон прийшло повідомлення з невідомого номера.",
  },
  {
    start: 1710,
    end: 1834,
    text: "«Забери рапорт. Інакше матимеш проблеми».",
  },
  {
    start: 1834,
    end: 2025,
    text: "Він перечитав ці слова тричі. А потім зателефонував адвокату.",
  },
  {
    start: 2025,
    end: 2179,
    text: "Адвокат знову збільшив фото. Тепер його увагу привернула печатка.",
  },
  {
    start: 2179,
    end: 2317,
    text: "Вона виглядала справжньою. Але належала зовсім іншому підрозділу.",
  },
  {
    start: 2317,
    end: 2380,
    text: "Це вже не було схоже на звичайну помилку в документах.",
  },
  {
    start: 2380,
    end: 2502,
    text: "Адвокат зрозумів: хтось не просто загубив рапорт. Хтось залишив підказку.",
  },
  {
    start: 2502,
    end: 2578,
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
