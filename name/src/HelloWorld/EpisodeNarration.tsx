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
  { start: 0, end: 150, text: "Три дні тому він подав рапорт: лікарі наполягали на стаціонарному обстеженні.",
  },
  { start: 150, end: 285, text: "У відповідь почув лише одне: «Чекай. Зараз не до цього».",
  },
  { start: 285, end: 463, text: "Він чекав. Біль посилювався. А рапорт так і не повернувся з резолюцією.",
  },
  { start: 463, end: 592, text: "На третій день йому сказали, що такого документа взагалі не надходило.",
  },
  { start: 592, end: 720, text: "Але в нього залишилася копія. І на ній був вхідний номер.",
  },
  { start: 720, end: 870, text: "Він надіслав фото адвокату. Той одразу попросив не видаляти жодного повідомлення.",
  },
  { start: 870, end: 1050, text: "Дата була. Підпис був. Та підтвердження, куди саме передали рапорт, не було.",
  },
  { start: 1050, end: 1170, text: "Адвокат почав перевіряти шлях документа. І знайшов дивну невідповідність.",
  },
  { start: 1170, end: 1260, text: "У журналі за цим номером значилося зовсім інше звернення.",
  },
  { start: 1260, end: 1320, text: "Два різні рапорти.",
  },
  { start: 1320, end: 1380, text: "Один номер. Одна дата.",
  },
  { start: 1380, end: 1410, text: "Такого збігу не мало бути.",
  },
  { start: 1410, end: 1560, text: "Військовий зрозумів: хтось дуже хотів, щоб його звернення зникло без сліду.",
  },
  { start: 1560, end: 1620, text: "І саме тоді на телефон прийшло повідомлення з невідомого номера.",
  },
  { start: 1620, end: 1770, text: "«Забери рапорт. Інакше матимеш проблеми».",
  },
  { start: 1770, end: 1860, text: "Він перечитав ці слова тричі. А потім зателефонував адвокату.",
  },
  { start: 1860, end: 2040, text: "Адвокат знову збільшив фото. Тепер його увагу привернула печатка.",
  },
  { start: 2040, end: 2130, text: "Вона виглядала справжньою. Але належала зовсім іншому підрозділу.",
  },
  { start: 2130, end: 2220, text: "Це вже не було схоже на звичайну помилку в документах.",
  },
  { start: 2220, end: 2340, text: "Адвокат зрозумів: хтось не просто загубив рапорт. Хтось залишив підказку.",
  },
  { start: 2340, end: 2621, text: "І тоді задзвонив телефон. На екрані — номер військової частини.",
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
