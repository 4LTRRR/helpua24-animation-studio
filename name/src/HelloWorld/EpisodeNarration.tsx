import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";

type NarrationCue = {
  start: number;
  end: number;
  text: string;
};

const cues: NarrationCue[] = [
  {
    start: 90,
    end: 300,
    text: "Три дні тому він подав рапорт: лікарі наполягали на стаціонарному обстеженні.",
  },
  {
    start: 300,
    end: 480,
    text: "У відповідь почув лише одне: «Чекай. Зараз не до цього».",
  },
  {
    start: 480,
    end: 660,
    text: "Він чекав. Біль посилювався. А рапорт так і не повернувся з резолюцією.",
  },
  {
    start: 660,
    end: 840,
    text: "На третій день йому сказали, що такого документа взагалі не надходило.",
  },
  {
    start: 840,
    end: 990,
    text: "Але в нього залишилася копія. І на ній був вхідний номер.",
  },
  {
    start: 990,
    end: 1200,
    text: "Він надіслав фото адвокату. Той одразу попросив не видаляти жодного повідомлення.",
  },
  {
    start: 1200,
    end: 1410,
    text: "Дата була. Підпис був. Та підтвердження, куди саме передали рапорт, не було.",
  },
  {
    start: 1410,
    end: 1620,
    text: "Адвокат почав перевіряти шлях документа. І знайшов дивну невідповідність.",
  },
  {
    start: 1620,
    end: 1800,
    text: "У журналі за цим номером значилося зовсім інше звернення.",
  },
  {
    start: 1800,
    end: 2010,
    text: "Два різні рапорти. Один номер. Одна дата. Такого збігу не мало бути.",
  },
  {
    start: 2010,
    end: 2220,
    text: "Військовий зрозумів: хтось дуже хотів, щоб його звернення зникло без сліду.",
  },
  {
    start: 2220,
    end: 2400,
    text: "І саме тоді на телефон прийшло повідомлення з невідомого номера.",
  },
  {
    start: 2400,
    end: 2580,
    text: "«Забери рапорт. Інакше матимеш проблеми».",
  },
  {
    start: 2580,
    end: 2760,
    text: "Він перечитав ці слова тричі. А потім зателефонував адвокату.",
  },
  {
    start: 2760,
    end: 2970,
    text: "Адвокат знову збільшив фото. Тепер його увагу привернула печатка.",
  },
  {
    start: 2970,
    end: 3180,
    text: "Вона виглядала справжньою. Але належала зовсім іншому підрозділу.",
  },
  {
    start: 3180,
    end: 3390,
    text: "Це вже не було схоже на звичайну помилку в документах.",
  },
  {
    start: 3390,
    end: 3540,
    text: "Адвокат зрозумів: хтось не просто загубив рапорт. Хтось залишив підказку.",
  },
  {
    start: 3540,
    end: 3600,
    text: "І тоді задзвонив телефон. На екрані — номер військової частини.",
  },
];

export const EpisodeNarration: React.FC = () => {
  const frame = useCurrentFrame();
  const cue = cues.find((item) => frame >= item.start && frame < item.end);

  const opacity = cue
    ? interpolate(
        frame,
        [cue.start, cue.start + 12, cue.end - 12, cue.end],
        [0, 1, 1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
      )
    : 0;

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
            left: "6%",
            right: "6%",
            bottom: 175,
            padding: "30px 34px",
            background:
              "linear-gradient(110deg, rgba(7, 12, 17, 0.94), rgba(17, 24, 31, 0.84))",
            borderLeft: "6px solid #b78b55",
            borderRadius: 8,
            boxShadow: "0 16px 50px rgba(0,0,0,0.32)",
            opacity,
            transform: `translateY(${interpolate(opacity, [0, 1], [18, 0])}px)`,
          }}
        >
          <div
            style={{
              marginBottom: 12,
              color: "#c9a575",
              fontFamily: "Arial, sans-serif",
              fontSize: 19,
              fontWeight: 700,
              letterSpacing: 3,
            }}
          >
            РАПОРТ, ЯКОГО НІХТО НЕ БАЧИТЬ
          </div>
          <div
            style={{
              color: "#ffffff",
              fontFamily: "Arial, sans-serif",
              fontSize: 39,
              lineHeight: 1.24,
              fontWeight: 600,
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
