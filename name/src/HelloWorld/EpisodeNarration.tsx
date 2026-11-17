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
    end: 244,
    text: "Три дні тому він подав рапорт: лікарі наполягали на стаціонарному обстеженні.",
  },
  {
    start: 244,
    end: 375,
    text: "У відповідь почув лише одне: «Чекай. Зараз не до цього».",
  },
  {
    start: 375,
    end: 507,
    text: "Він чекав. Біль посилювався. А рапорт так і не повернувся з резолюцією.",
  },
  {
    start: 507,
    end: 638,
    text: "На третій день йому сказали, що такого документа взагалі не надходило.",
  },
  {
    start: 638,
    end: 748,
    text: "Але в нього залишилася копія. І на ній був вхідний номер.",
  },
  {
    start: 748,
    end: 901,
    text: "Він надіслав фото адвокату. Той одразу попросив не видаляти жодного повідомлення.",
  },
  {
    start: 901,
    end: 1055,
    text: "Дата була. Підпис був. Та підтвердження, куди саме передали рапорт, не було.",
  },
  {
    start: 1055,
    end: 1209,
    text: "Адвокат почав перевіряти шлях документа. І знайшов дивну невідповідність.",
  },
  {
    start: 1209,
    end: 1340,
    text: "У журналі за цим номером значилося зовсім інше звернення.",
  },
  {
    start: 1340,
    end: 1494,
    text: "Два різні рапорти. Один номер. Одна дата. Такого збігу не мало бути.",
  },
  {
    start: 1494,
    end: 1647,
    text: "Військовий зрозумів: хтось дуже хотів, щоб його звернення зникло без сліду.",
  },
  {
    start: 1647,
    end: 1779,
    text: "І саме тоді на телефон прийшло повідомлення з невідомого номера.",
  },
  {
    start: 1779,
    end: 1910,
    text: "«Забери рапорт. Інакше матимеш проблеми».",
  },
  {
    start: 1910,
    end: 2042,
    text: "Він перечитав ці слова тричі. А потім зателефонував адвокату.",
  },
  {
    start: 2042,
    end: 2195,
    text: "Адвокат знову збільшив фото. Тепер його увагу привернула печатка.",
  },
  {
    start: 2195,
    end: 2349,
    text: "Вона виглядала справжньою. Але належала зовсім іншому підрозділу.",
  },
  {
    start: 2349,
    end: 2502,
    text: "Це вже не було схоже на звичайну помилку в документах.",
  },
  {
    start: 2502,
    end: 2612,
    text: "Адвокат зрозумів: хтось не просто загубив рапорт. Хтось залишив підказку.",
  },
  {
    start: 2612,
    end: 2656,
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
            transform: `translateY(${interpolate(opacity, [0, 1], [18, 0])}px)`,
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
