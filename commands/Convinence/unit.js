var { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('단위검색')
        .setDescription('단위에 대해 설명해.')
        .addStringOption(option =>
            option.setName('단위')
                .setDescription('단위의 기호나, 이름을 적어봐.')
                .setRequired(true)),
    async execute(interaction) {

        if (interaction.options.getString('단위') === "접두어") {

            var Embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`✅ **국제단위계 접두어!** ✅`)
                .addFields(
                    { name: '**𝐘 요타**', value: `10²⁴배`, inline: true },
                    { name: '**𝐙 제타**', value: `10²¹배`, inline: true },
                    { name: '**𝐄 헥사**', value: `10¹⁸배`, inline: true },
                    { name: '**𝐏 페타**', value: `10¹⁵배`, inline: true },
                    { name: '**𝐓 테라**', value: `10¹²배`, inline: true },
                    { name: '**𝐆 기가**', value: `10⁹배`, inline: true },
                    { name: '**𝐌 메가**', value: `10⁶배`, inline: true },
                    { name: '**𝐤 킬로**', value: `10³배`, inline: true },
                    { name: '**𝐡 헥토**', value: `10²배`, inline: true },
                    { name: '**𝐝𝐚 데카**', value: `10배`, inline: true },
                    { name: '**-**', value: `1배`, inline: true },
                    { name: '**𝐝 데시**', value: `10⁻¹`, inline: true },
                    { name: '**𝐜 센티**', value: `10⁻²`, inline: true },
                    { name: '**𝐦 밀리**', value: `10⁻³`, inline: true },
                    { name: '**μ 마이크로**', value: `10⁻⁶`, inline: true },
                    { name: '**𝐧 나노**', value: `10⁻⁹`, inline: true },
                    { name: '**𝐩 피코**', value: `10⁻¹²`, inline: true },
                    { name: '**𝐟 펨토**', value: `10⁻¹⁵`, inline: true },
                    { name: '**𝐚 아토**', value: `10⁻¹⁸`, inline: true },
                    { name: '**𝐳 젭토**', value: `10⁻²¹`, inline: true },
                    { name: '**𝐲 욕토**', value: `10⁻²⁴`, inline: true }
                )
                .setTimestamp()

            return interaction.reply({ embeds: [Embed] });

        } else if (interaction.options.getString('단위') === "m" || interaction.options.getString('단위') === "미터") {

            var Embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`📐 **미터(meter) - 요오드 안정화 헬륨 · 네온 레이저에서 나온 빛이 진공 상태에서 2억 9979만 2458분의 1초 동안에 이동한 거리** 📐`)
                .setDescription(`1789년 프랑스혁명 후 도량형의 통일을 시도했다. 미터 이름의 유래는 그리스어 'metron(잰다)'에서 따온 것이다.\n
1791년 프랑스 정치가 '탈레랑'이 제안한 1미터의 크기는 "적도에서 프랑스 파리를 지나 북극점까지의 이르는 거리의 1000만 분의 1"이었다.\n
그 후 프랑스 천문학자 '들랑브로'와 '메생'이 각각 프랑스 북부와 남부 거리를 측정했고, 1875년 20개국 참가국 중 17명이 서명한 '미터 협약'이 체결되었다.\n\n
하지만 시간이 지나며 지구의 둘레가 변화한다는 사실을 깨달았고, 현재는 빛의 속력으로 미터를 정의하는 중이다.`)
                .addFields(
                    { name: '**🛠️ 기호**', value: `m`, inline: true },
                    { name: '**💼 접두어 사용**', value: `✅ 가능`, inline: true },
                    { name: '**📖 내용**', value: `📐 길이의 단위`, inline: true }
                )
                .setTimestamp()

            return interaction.reply({ embeds: [Embed] });

        } else if (interaction.options.getString('단위') === "kg" || interaction.options.getString('단위') === "킬로그램") {

            var Embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`⚖️ **킬로그램(kilogram) - 4℃에서 1L인 물의 질량** ⚖️`)
                .setDescription(`킬로그램 역시 18세기 말 프랑스혁명에서 미터와 함께 파생되었다.\n
킬로그램을 정의한 학자의 이름은 '라부아지에', 물을 수소와 산소로 분리해낸 과학자이다.\n\n

킬로그램은 물의 밀도가 불안정한 점 때문에 미터 협약에서 1kg에 해당하는 질량 원기를 정했다.\n
이때 만든 질량 원기가 세브르의 국제도량형국 지하에 보관된 '국제 킬로그램 원기' 이다.\n
프랑스 외의 국가들은 이 원기를 복제한 부원기로 킬로그램을 측정한다.
`)
                .addFields(
                    { name: '**🛠️ 기호**', value: `kg`, inline: true },
                    { name: '**💼 접두어 사용**', value: `✅ 가능`, inline: true },
                    { name: '**📖 내용**', value: `⚖️ 질량의 단위`, inline: true }
                )
                .setTimestamp()

            return interaction.reply({ embeds: [Embed] });

        } else if (interaction.options.getString('단위') === "gr" || interaction.options.getString('단위') === "그레인") {

            var Embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`⚖️ **그레인(grain) - 64.79891mg** ⚖️`)
                .setDescription(`
곡류의 씨앗 하나의 질량에서 유래된 단위이다.\n
청동기시대부터 르네상스시대에 이르기까지 밀과 보리 곡류의 평균 질량은\n
질량 단위의 합법적인 정의의 일부에 속했다.
`)
                .addFields(
                    { name: '**🛠️ 기호**', value: `gr`, inline: true },
                    { name: '**💼 접두어 사용**', value: `✅ 가능`, inline: true },
                    { name: '**📖 내용**', value: `⚖️ 질량의 단위`, inline: true }
                )
                .setTimestamp()

            return interaction.reply({ embeds: [Embed] });

        } else if (interaction.options.getString('단위') === "t" || interaction.options.getString('단위') === "톤") {

            var Embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`⚖️ **톤(ton): 100만g** ⚖️`)
                .setDescription(`
13세기 유럽에서 항구를 이용하는 상인에게 항구세를 징수했는데 이는 선박에 실린 술통의 개수를 기준으로 했다.\n
따라서 상인들이 세금 감면을 위해 술통의 크기를 키우고 개수를 줄이자 등장한 것이 바로 이 'tun'이라는 단위이다.\n
이 'tun'이 다른 화물에 적용되면서 현재는 선박의 화물 운송 능력을 나타내는 단위로 사용된다.\n
`)
                .addFields(
                    { name: '**🛠️ 기호**', value: `t`, inline: true },
                    { name: '**💼 접두어 사용**', value: `✅ 가능`, inline: true },
                    { name: '**📖 내용**', value: `⚖️ 질량의 단위`, inline: true }
                )
                .setTimestamp()

            return interaction.reply({ embeds: [Embed] });

        } else if (interaction.options.getString('단위') === "d" || interaction.options.getString('단위') === "일") {

            var Embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`⏰ **일(day): 86400s** ⏰`)
                .setDescription(`
처음 1일의 길이는 기원전 3500년에 지구의 자전에서 유래되었다. 이를 '태양시' 라 하고, 수메르인들이 사용했다.\n
태양이 북반구를 기준으로 정남쪽에 와 있을 때를 '남중(南中, 정오)' 이라고 한다.\n
'남중에서 다음번 남중까지의 시간'이 바로 1일이었으나, 지구의 자전과 공전은 굉장히 자주 바뀐다.\n
따라서 '1일'과 '1년'의 길이가 일정하지 않기 때문에, 1967년부터는 원자시계를 사용해 정의한다.\n
`)
                .addFields(
                    { name: '**🛠️ 기호**', value: `d`, inline: true },
                    { name: '**💼 접두어 사용**', value: `❌ 불가능`, inline: true },
                    { name: '**📖 내용**', value: `⏰ 시간의 단위`, inline: true }
                )
                .setTimestamp()

            return interaction.reply({ embeds: [Embed] });

        } else if (interaction.options.getString('단위') === "min" || interaction.options.getString('단위') === "분") {

            var Embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`⏰ **분(minutes): 60s** ⏰`)
                .setDescription(`
1일을 1440등분한 것이 분(min)이다. minute는 라틴어로 '작다'는 의미의 'minutus' 에서 유래되었다. 'mini'와 동일한 어원이다.
다만, '1일'의 기준이었던 지구의 자전과 공전은 굉장히 자주 바뀐다.\n
따라서 '1일'과 '1년'의 길이가 일정하지 않기 때문에, 1967년부터는 원자시계를 사용해 1분을 정의하고 있다.
`)
                .addFields(
                    { name: '**🛠️ 기호**', value: `s`, inline: true },
                    { name: '**💼 접두어 사용**', value: `❌ 불가능`, inline: true },
                    { name: '**📖 내용**', value: `⏰ 시간의 단위`, inline: true }
                )
                .setTimestamp()

            return interaction.reply({ embeds: [Embed] });

        } else if (interaction.options.getString('단위') === "h" || interaction.options.getString('단위') === "시간") {

            var Embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`⏰ **시간(hour): 3600s** ⏰`)
                .setDescription(`
1일을 24등분 한 것이 시간(hour)이다. hour은 시간을 의미하는 그리스어 hora(호라이)에서 유래되었다.
다만, 지구의 자전과 공전은 굉장히 자주 바뀐다.
따라서 '1일'과 '1년'의 길이가 일정하지 않기 때문에, 1967년부터는 '원자시계'를 사용해 1초를 정의하고 있다.
`)
                .addFields(
                    { name: '**🛠️ 기호**', value: `s`, inline: true },
                    { name: '**💼 접두어 사용**', value: `❌ 불가능`, inline: true },
                    { name: '**📖 내용**', value: `⏰ 시간의 단위`, inline: true }
                )
                .setTimestamp()

            return interaction.reply({ embeds: [Embed] });

        } else if (interaction.options.getString('단위') === "s" || interaction.options.getString('단위') === "초") {

            var Embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`⏰ **초(second): 바닥 상태에 있는 세슘-133(Cs133) 원자가 두 개의 초미세 준위 사이를 전이할 때 발생하는 전자기파 복사가 9,192,631,770번 진동하는 시간** ⏰`)
                .setDescription(`
처음에 등장한 1초의 길이는 기원전 3500년 전 지구의 자전에서 유래되었다. 이를 '태양시' 라 하고, 수메르인들이 사용했다.
다만, 지구의 자전과 공전은 굉장히 자주 바뀐다.
따라서 '1일'과 '1년'의 길이가 일정하지 않기 때문에, 1967년부터는 세슘 원자를 이용한 '원자시계'를 사용해 1초를 정의하고 있다. 이를 '원자시'라 한다.
`)
                .addFields(
                    { name: '**🛠️ 기호**', value: `s`, inline: true },
                    { name: '**💼 접두어 사용**', value: `❌ 불가능`, inline: true },
                    { name: '**📖 내용**', value: `⏰ 시간의 단위`, inline: true }
                )
                .setTimestamp()

            return interaction.reply({ embeds: [Embed] });

        } else if (interaction.options.getString('단위') === "K" || interaction.options.getString('단위') === "켈빈") {

            var Embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`🌡️ **켈빈(Kelvin): 분자의 운동에너지가 0이 될 때 온도인 '절대온도'를 온도의 최저점으로 하고, 눈금 가격을 섭씨온도와 같게 한 온도 단위** 🌡️`)
                .setDescription(`

켈빈(K)은 스코틀랜드 물리학자 윌리엄 톰슨이 1848년 제안한 온도 단위이다. \n윌리엄 톰슨의 다른 이름이 켈빈이고,
이는 스코틀랜드 글래스고 대학교 캠퍼스 앞에 흐르는 강 이름인 켈빈 강에서 따온 이름이다.\n\n

19세기 영국에서 산업혁명이 일어났을 때 증기기관의 열효율을 높이기 위해 탄생한 학문이 '열역학'이다.\n\n

켈빈온도의 시작지점인 0K는 에너지 총량이 0인 지점의 온도이고, 우주에 존재하는 모든 물체는 0K 이상의 온도를 가진다.\n
따라서 0K를 '절대온도'라 부르고, 이는 -273.15℃이다.
`)
                .addFields(
                    { name: '**🛠️ 기호**', value: `K`, inline: true },
                    { name: '**💼 접두어 사용**', value: `❌ 불가능`, inline: true },
                    { name: '**📖 내용**', value: `🌡️ 온도의 단위`, inline: true }
                )
                .setTimestamp()

            return interaction.reply({ embeds: [Embed] });

        } else if (interaction.options.getString('단위') === "℃" || interaction.options.getString('단위') === "섭씨") {

            var Embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`🌡️ **섭씨(셀시우스도): 켈빈으로 표시된 열역학온도의 수치에서 273.15를 뺀 것** 🌡️`)
                .setDescription(`
섭씨온도는 스웨덴의 안데르스 셀시우스가 1742년에 고안했다.\n
셀시우스는 같은 기압에서 물의 어는 점과 끓는 점의 온도가 일정한 것을 발견하고,\n
'물이 끓 온도를 0℃로, 물이 어는 온도를 100℃'로 두고 그 사이를 100등분한 섭씨온도를 제안했다.\n
현재는 그가 사망한 뒤 어는 점 0℃로, 끓는 점을 100℃로 수정한 것이다.\n\n

℃의 C는 셀시우스(Celsius)의 머리글자이다. 과거 중국에서는 셀시우스를 '섭이수(㒤爾修)'라고 쓰기 때문에 ℃를 '섭씨'라고 읽는다.\n
(섭'씨'는 김씨, 박씨와 같은 느낌)

`)
                .addFields(
                    { name: '**🛠️ 기호**', value: `℃`, inline: true },
                    { name: '**💼 접두어 사용**', value: `❌ 불가능`, inline: true },
                    { name: '**📖 내용**', value: `🌡️ 온도의 단위`, inline: true }
                )
                .setTimestamp()

            return interaction.reply({ embeds: [Embed] });

        } else if (interaction.options.getString('단위') === "℉" || interaction.options.getString('단위') === "화씨") {

            var Embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`🌡️ **화씨(파렌화이트도): ** 🌡️`)
                .setDescription(`

1709년 알코올 온도계와 1714년 수은온도계를 발명한 독일의 물리학자 '다니엘 가브리엘 파렌하이트' 가\n
물이 어는 점과 끓는 점 사이를 180등분해서 만든 온도 단위가 화씨온도이다.\n
파렌하이트는 물이 어는 점이 아닌, 그 당시 사람이 만들 수 있는 가장 차가운 온도인 '소금물이 어는 온도'를 0도로 정했다.\n
따라서 순수한 물이 어는 온도는 0도가 아니라 32도가 된 것이고, 끓는 온도는 212도가 된 것이다.\n\n
℃의 C는 셀시우스(Celsius)의 머리글자이다. 과거 중국에서는 셀시우스를 '섭이수(㒤爾修)'라고 쓰기 때문에 ℃를 '섭씨'라고 읽는다.\n
(섭'씨'는 김씨, 박씨와 같은 맥락)
`)
                .addFields(
                    { name: '**🛠️ 기호**', value: `℉`, inline: true },
                    { name: '**💼 접두어 사용**', value: `❌ 불가능`, inline: true },
                    { name: '**📖 내용**', value: `🌡️ 온도의 단위`, inline: true }
                )
                .setTimestamp()

            return interaction.reply({ embeds: [Embed] });

        } else if (interaction.options.getString('단위') === "℉" || interaction.options.getString('단위') === "화씨") {

            var Embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`🌡️ **화씨(파렌화이트도): ** 🌡️`)
                .setDescription(`

1709년 알코올 온도계와 1714년 수은온도계를 발명한 독일의 물리학자 '다니엘 가브리엘 파렌하이트' 가\n
물이 어는 점과 끓는 점 사이를 180등분해서 만든 온도 단위가 화씨온도이다.\n
파렌하이트는 물이 어는 점이 아닌, 그 당시 사람이 만들 수 있는 가장 차가운 온도인 '소금물이 어는 온도'를 0도로 정했다.\n
따라서 순수한 물이 어는 온도는 0도가 아니라 32도가 된 것이고, 끓는 온도는 212도가 된 것이다.\n\n
℉의 F는 셀시우스(Fahrenheit)의 머리글자이다. 과거 중국에서는 피렌하이트를 '화륜해(華倫海)'라고 쓰기 때문에 ℉를 '화씨'라고 읽는다.\n
(섭'씨'는 김씨, 박씨와 같은 맥락)
`)
                .addFields(
                    { name: '**🛠️ 기호**', value: `℉`, inline: true },
                    { name: '**💼 접두어 사용**', value: `❌ 불가능`, inline: true },
                    { name: '**📖 내용**', value: `🌡️ 온도의 단위`, inline: true }
                )
                .setTimestamp()

            return interaction.reply({ embeds: [Embed] });

        } else if (interaction.options.getString('단위') === "cd" || interaction.options.getString('단위') === "칸델라") {

            var Embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`💡 **칸델라(candela): 진동수가 540*10¹²Hz(540기가헤르츠)인 단색광을 방출하는 광원의 복사도가 어떤 주어진 방향으로 1 스테디라인(sr) 당 683분의 1W(와트)일 때 이 방향에 대한 광도** 💡`)
                .setDescription(`
칸델라는 '빛나다'라는 뜻의 라틴어이다. 캔들(촛불)의 어원이다.\n\n

1cd는 1m²의 공간 안에 켜져 있는 초 한 개의 밝기만큼을 말한다.\n
1948년 제 9차 도량형총회에서 빛의 밝기 단위로 칸델라가 채택되기 전까진 광도를 표현하기 위해 여러 단위를 사용했다.\n
그 후 현재는 1979년 제 16차 국제도량형총회에서 결정된 내용을 사용한다.\n

`)
                .addFields(
                    { name: '**🛠️ 기호**', value: `cd`, inline: true },
                    { name: '**💼 접두어 사용**', value: `❌ 불가능`, inline: true },
                    { name: '**📖 내용**', value: `💡 빛의 단위`, inline: true }
                )
                .setTimestamp()

            return interaction.reply({ embeds: [Embed] });

        } else if (interaction.options.getString('단위') === "cd" || interaction.options.getString('단위') === "루멘") {

            var Embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`💡 **루멘(lumen): 1cd(칸델라)의 균일한 광도가 나오는 광원으로부터 1sr(스테라디안, 단위입체각) 면적에 방출되는 광선속(광선의 집합)** 💡`)
                .setDescription(`
백열전구나 형광등의 경우 밝기의 단위로 와트(W)를 사용한다.\n
하지만 LED 전구의 경우 밝기를 표시하는 단위로 '루멘(lm)'을 사용한다.\n
`)
                .addFields(
                    { name: '**🛠️ 기호**', value: `lm`, inline: true },
                    { name: '**💼 접두어 사용**', value: `❌ 불가능`, inline: true },
                    { name: '**📖 내용**', value: `💡 광속의 단위`, inline: true }
                )
                .setTimestamp()

            return interaction.reply({ embeds: [Embed] });

        } else if (interaction.options.getString('단위') === "lx" || interaction.options.getString('단위') === "룩스") {

            var Embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`💡 **루멘(lumen): 1cd(칸델라)의 균일한 광도가 나오는 광원으로부터 1sr(스테다리안, 단위입체각) 면적에 방출되는 광선속(광선의 집합)** 💡`)
                .setDescription(`
백열전구나 형광등의 경우 밝기의 단위로 와트(W)를 사용한다.\n
하지만 LED 전구의 경우 밝기를 표시하는 단위로 '루멘(lm)'을 사용한다.\n
`)
                .addFields(
                    { name: '**🛠️ 기호**', value: `lm`, inline: true },
                    { name: '**💼 접두어 사용**', value: `❌ 불가능`, inline: true },
                    { name: '**📖 내용**', value: `💡 광속의 단위`, inline: true }
                )
                .setTimestamp()

            return interaction.reply({ embeds: [Embed] });

        } else if (interaction.options.getString('단위') === "A" || interaction.options.getString('단위') === "암페어") {

            var Embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`⚡ **암페어(Ampere): 진공 중에서 1m 간격으로 평행하게 놓인, 무시할 수 있을 단큼 작은 원형 단면적을 가진 두 개의 무한히 긴 두 직선 도체에 각각 흘러서, 도체 1m마다 2*10-7N의 힘을 미치는 일정한 전류** ⚡`)
                .setDescription(`
전기란? 전자의 이동으로 생기는 에너지의 한 형태이다.\n
그리고, 도체 안을 흐르는 전자의 흐름이 전류이다.\n
전기는 일정한 형태로 가두어 둘 수 없기 때문에 1초 동안 흐르는 전기량이 아닌, 길고 복잡한 정의를 사용한다.\n
\`* 배터리의 경우 화학 에너지로 저장\`\n\n

프랑스 출신 물리학자 앙페르(Andre Marie Ampere)의 이름에서 유래되었다.

`)
                .addFields(
                    { name: '**🛠️ 기호**', value: `A`, inline: true },
                    { name: '**💼 접두어 사용**', value: `✅ 가능`, inline: true },
                    { name: '**📖 내용**', value: `⚡ 전류의 단위`, inline: true }
                )
                .setTimestamp()

            return interaction.reply({ embeds: [Embed] });

        } else if (interaction.options.getString('단위') === "V" || interaction.options.getString('단위') === "볼트") {

            var Embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`⚡ **암페어(Volt): 진공 중에서 1m 간격으로 평행하게 놓인, 무시할 수 있을 단큼 작은 원형 단면적을 가진 두 개의 무한히 긴 두 직선 도체에 각각 흘러서, 도체 1m마다 2*10-7N의 힘을 미치는 일정한 전류** ⚡`)
                .setDescription(`
전압은 '전류를 흐르게 하는 힘'을 의미한다.\n
이는 전지를 발명한 이탈리아의 물리학자 볼타(Alessandro Volta)의 이름에서 따왔다.\n
`)
                .addFields(
                    { name: '**🛠️ 기호**', value: `V`, inline: true },
                    { name: '**💼 접두어 사용**', value: `✅ 가능`, inline: true },
                    { name: '**📖 내용**', value: `⚡ 전압의 단위`, inline: true }
                )
                .setTimestamp()

            return interaction.reply({ embeds: [Embed] });

        } else if (interaction.options.getString('단위') === "doz" || interaction.options.getString('단위') === "다스") {

            var Embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`✏️ **다스(dozen): 동일 종류의 물품 12개** ✏️`)
                .setDescription(`
다스는 '같은 종류의 물건'에서만 사용할 수 있다.\n
'다스'는 12개의 묶음을 세는 단위이고, 영어 발음인 'dozen'을 일본식으로 발음한 것이 '다스'이다.\n
왜 다스는 12개를 기준으로 하는가 하면, 12는 약수가 많기 때문이다.\n
따라서 12다스(144개)는 1그로스, 12그로스(1728개)는 1그레이트그로스(great gross)이다.\n
`)
                .addFields(
                    { name: '**🛠️ 기호**', value: `doz`, inline: true },
                    { name: '**💼 접두어 사용**', value: `❌ 불가능`, inline: true },
                    { name: '**📖 내용**', value: `✏️ 묶어 세기의 단위`, inline: true }
                )
                .setTimestamp()

            return interaction.reply({ embeds: [Embed] });

        } else if (interaction.options.getString('단위') === "mol" || interaction.options.getString('단위') === "몰") {

            var Embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`✏️ **몰(mol): 탄소12(12C) 0.012kg에 포함된 원자 개수와 같은 수의 구성 요소를 갖는 물질의 양** ✏️`)
                .setDescription(`
화학에서, 6.02 × 10²³개를 묶어 셀 때 몰(mol)이라는 단위를 사용한다.\n
이 수를 화학자 아메데오 아보가드로의 이름에서 유래된 '아보가드로 수'라 부른다.\n
아보가드로 수는 12g의 탄소 원자가 가진 원자의 개수이다.\n\n

원자나 분자는 물질에 따라 질량이 다르다.\n
수소 원자 1개의 질량은 1, 탄소 원자 한 개의 질량은 12, 산소 원자 한 개의 질량은 16이며,\n
이를 '질량수'라고 한다. 따라서 물의 질량수는 H+H+O = 1+1+16=18이다.\n\n

수소의 몰질량: 1g, 산소의 몰질량: 16g, 물의 몰질량: 18g\n\n

\`* 몰질량: 1몰의 질량\`
`)
                .addFields(
                    { name: '**🛠️ 기호**', value: `mol`, inline: true },
                    { name: '**💼 접두어 사용**', value: `❌ 불가능`, inline: true },
                    { name: '**📖 내용**', value: `✏️ 묶어 세기의 단위`, inline: true }
                )
                .setTimestamp()

            return interaction.reply({ embeds: [Embed] });

        } else if (interaction.options.getString('단위') === "m^2" || interaction.options.getString('단위') === "제곱미터") {

            var Embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`🚩 **제곱미터(m²): 한 변의 길이가 1m인 정사각형의 면적** 🚩`)
                .setDescription(`
면적은 한 변이 1m인 정사각형의 면적 몇 개분에 해당하는지를 나타낸다.\n
제곱미터는 새로 생긴 단위가 아닌, 국제단위계의 일곱 개 기본단위를 조합해 만들어진 단위이다.\n\n

\`m(가로)*m(세로)=m²(면적)\`
 
`)
                .addFields(
                    { name: '**🛠️ 기호**', value: `m²`, inline: true },
                    { name: '**💼 접두어 사용**', value: `✅ 가능`, inline: true },
                    { name: '**📖 내용**', value: `🚩 면적의 단위`, inline: true }
                )
                .setTimestamp()

            return interaction.reply({ embeds: [Embed] });

        } else if (interaction.options.getString('단위') === "a" || interaction.options.getString('단위') === "아르") {

            var Embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`🚩 **제곱미터(square meter): 한 변의 길이가 1m인 정사각형의 면적** 🚩`)
                .setDescription(`

are의 어원은 평평한 빈터를 뜻하는 라틴어 'area'에서 유래된 단위이다.\n
1아르는 한 변의 길이가 10m인 정사각형의 면적을 나타낸다.\n
즉, 100m²인 것이다.\n
다만 아르에는 ²가 붙어있지 않는 이유는, 아르는 조합해서 만든 단위가 아니기 때문이다.\n\n

1아르의 100배에 해당하는 면적, 즉 100m × 100m인 정사각형의 면적은 헥타르(hectare)라는 단위로 표시한다.\n
100제곱미터를 의미하는 아르(are)에 100배를 의미하는 접두어 헥토(hecto)가 결합한 단위이다.\n
기호는 'ha'이다. 
`)
                .addFields(
                    { name: '**🛠️ 기호**', value: `a`, inline: true },
                    { name: '**💼 접두어 사용**', value: `❌ 불가능`, inline: true },
                    { name: '**📖 내용**', value: `🚩 면적의 단위`, inline: true }
                )
                .setTimestamp()

            return interaction.reply({ embeds: [Embed] });

        } else if (interaction.options.getString('단위') === "L" || interaction.options.getString('단위') === "리터") {

            var Embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`🎲 **리터(liter): 1dm³** 🎲`)
                .setDescription(`

리터의 경우 인명에서 유래된 기호가 아니라 l로 쓰는 게 맞지만, 1과 혼동이 올 수 있어 L로 표기한다.\n
\`*dm은 '데시미터'로, deci는 10을 의미하는 라틴어 decimus에서 유래되었다. 10분의 1을 나타낸다. 1m=10dm\`\n\n

\`\`\`* 리터의 필기체는 틀린 표기이다.
순수한 물 1mL = 1g, 1L = 1kg, 1kL = 1t\`\`\`
`)
                .addFields(
                    { name: '**🛠️ 기호**', value: `L`, inline: true },
                    { name: '**💼 접두어 사용**', value: `✅ 가능`, inline: true },
                    { name: '**📖 내용**', value: `🎲 부피의 단위`, inline: true }
                )
                .setTimestamp()

            return interaction.reply({ embeds: [Embed] });

        } else if (interaction.options.getString('단위') === "m³" || interaction.options.getString('단위') === "세제곱미터" || interaction.options.getString('단위') === "cc" || interaction.options.getString('단위') === "씨씨") {

            var Embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`🎲 **세제곱미터(cubic meter): 한 변의 길이가 1m인 정육면체의 부피** 🎲`)
                .setDescription(`
부피는 한 변이 1m인 정육면체의 부피 몇 개분에 해당하는지를 나타낸다.\n
제곱미터는 새로 생긴 단위가 아닌, 국제단위계의 일곱 개 기본단위를 조합해 만들어진 단위이다.\n\n

m(가로) × m(세로) × m(높이)=m³(부피)\n\n

\`* cc(cubic centimeter)와 cm³는 동일한 표현이다. cc에는 접두어가 붙지 않는다.\n
`)
                .addFields(
                    { name: '**🛠️ 기호**', value: `m³`, inline: true },
                    { name: '**💼 접두어 사용**', value: `✅ 가능`, inline: true },
                    { name: '**📖 내용**', value: `🎲 부피의 단위`, inline: true }
                )
                .setTimestamp()

            return interaction.reply({ embeds: [Embed] });

        } else if (interaction.options.getString('단위') === "gal" || interaction.options.getString('단위') === "갤런") {

            var Embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`🎲 **갤런(gallon): 지역단위이므로 크기 미정** 🎲`)
                .setDescription(`
미국에서는 물이나 석유를 셀 때 '갤런(gal, gallon)'이라는 단위를 사용한다.\n
갤런은 과거부터 사용되던 단위라 지역과 담는 대상에 따라 1갤런의 부피가 조금씩 달랐다.\n
미국의 액량 갤런과 건량 갤런은 다시 와인 갤런(231in^3)과 맥주 갤런(282in^3)으로 나뉘고, 영국에서는 액상 갤런을 사용한다.\n
그리고 이 갤런을 리터로 환산하면 영국과 캐나다의 1갤런은 4.546L, 미국의 1갤런은 3.785L이다.\n
`)
                .addFields(
                    { name: '**🛠️ 기호**', value: `gal`, inline: true },
                    { name: '**💼 접두어 사용**', value: `❌ 불가능`, inline: true },
                    { name: '**📖 내용**', value: `🎲 부피의 단위`, inline: true }
                )
                .setTimestamp()

            return interaction.reply({ embeds: [Embed] });

        } else if (interaction.options.getString('단위') === "bbl" || interaction.options.getString('단위') === "배럴") {

            var Embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`🎲 **배럴(barrel): 158.9L / 42gal** 🎲`)
                .setDescription(`
표준 배럴은 1872년 확정되었다. 석유 개발 초기에 1배럴은 약 189L였다.\n
하지만 원유를 배럴에 담아 운송하다 보니, 중간에 증발하거나 새는 일이 많았다.\n
따라서 목적지에 도착했을 때 배럴에 남아 있는 원유는 158.9L였다.\n
그래서 운송 중 유실분을 감안해 1배럴이 158.9L가 되었다.\n
`)
                .addFields(
                    { name: '**🛠️ 기호**', value: `bbl`, inline: true },
                    { name: '**💼 접두어 사용**', value: `❌ 불가능`, inline: true },
                    { name: '**📖 내용**', value: `🎲 부피의 단위`, inline: true }
                )
                .setTimestamp()

            return interaction.reply({ embeds: [Embed] });

        } else if (interaction.options.getString('단위') === "月" || interaction.options.getString('단위') === "월") {

            var Embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`📅 **월(月): 달력에서 1년을 열두 달로 나눈 것** 📅`)
                .setDescription(`
달의 모양 변화를 따라 만든 날짜 체계가 '태음력' 이며, 태음력에서 보름달이 뜨는 때는 매월 15일이다.\n
매월 첫 번째 날을 '초하루' 라고, 15일을 '보름'이라고 부르는 것도 달의 모양 변화에서 비롯되었다.\n
초하루를 삭(朔)이라고 부르는 것은 \`거스르다 역(逆)\`과 \`달 월(月)\`이 합쳐진 모양으로, \n
차고 이지러지는 달의 주기가 원상태로 돌아감을 나타낸다.\n
'1년'이라는 단위는 태양이, '1달'이라는 단위는 달이 지배하는 것이다.\n
대표적인 예시로 '1달'을 뜻하는 영어 단어 month의 어원이 되는 튜턴어(독일어의 모태) 'maeonth'가 달을 뜻하는 'maenon'에서 파생되었다.\n\n
\`* 크기가 일정하지 않으므로 단위가 아니다.\`
`)
                .addFields(
                    { name: '**🛠️ 기호**', value: `月`, inline: true },
                    { name: '**💼 접두어 사용**', value: `❌ 불가능`, inline: true },
                    { name: '**📖 내용**', value: `📅 날짜의 단위`, inline: true }
                )
                .setTimestamp()

            return interaction.reply({ embeds: [Embed] });

        } else if (interaction.options.getString('단위') === "주") { // 와트(W)와 겹치는 문제로 예외적으로 기호가 없음

            var Embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`📅 **주(Week): 7일** 📅`)
                .setDescription(`
'주'라는 기간은 중국 당나라에서 9세기경에 만들어졌다.\n
7일의 각 날에 숫자를 붙여 부르고 있으며, '1요일', '2요일'과 같이 부른다.\n
다만 영어에서의 '주'의 경우, 신화를 담고 있다.\n
'Wednesday'는 북유럽 신화의 주신(主神)인 '오딘의 날',\n
'Tuesday'는 전쟁의 신인 '티르(Tyr)', 'Thursday'는 천둥의 신 '토르(Thor)',\n
'Friday'는 오딘의 아내이자 사랑과 아름다움의 신 '프레이야(Freyia)'를 의미한다.\n\n

그럼 요일의 차례는 어떻게 정해졌을까?\n
고대 그리스나 이집트에서 지구로부터 멀리 떨어진 행성의 순서가 '토성, 목성, 화성, 태양, 금성, 수성, 달'(달이 제일 가까움) 이라고 생각했다.\n
그리고 이들이 한 시간마다 차례로 24시간을 쉬지 않고 지상을 수호한다고 생각했다.\n
따라서 일주일의 각 시간마다 지상을 수호하는 천체를 나열했고, 그 중 1시를 수호하는 천체의 이름을 순서로 정해진 것이다.\n
\`* 어려울 경우 위쪽 순서에서 3번씩 뛰어 세기를 해보자.\`
`)
                .addFields(
                    { name: '**🛠️ 기호**', value: `W`, inline: true },
                    { name: '**💼 접두어 사용**', value: `❌ 불가능`, inline: true },
                    { name: '**📖 내용**', value: `📅 날짜의 단위`, inline: true }
                )
                .setTimestamp()

            return interaction.reply({ embeds: [Embed] });

        } else if (interaction.options.getString('단위') === "m/s" || interaction.options.getString('단위') === "초당 미터") {

            var Embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`🚗 **초당 미터(meter per second): 초당 1m의 속도** 🚗`)
                .setDescription(`
국제단위계의 속도 단위는 'm/s'이다.\n
이는 거리(m)를 시간(s)로 나눈 단위이다.\n
`)
                .addFields(
                    { name: '**🛠️ 기호**', value: `W`, inline: true },
                    { name: '**💼 접두어 사용**', value: `✅ 가능`, inline: true },
                    { name: '**📖 내용**', value: `🚗 속력의 단위`, inline: true }
                )
                .setTimestamp()

            return interaction.reply({ embeds: [Embed] });

        } else if (interaction.options.getString('단위') === "%" || interaction.options.getString('단위') === "퍼센트" || interaction.options.getString('단위') === "백분율") {

            var Embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`📊 **퍼센트(percent): 전체 수량을 100으로 하여 그것에 대해 가지는 비율 (백분율)** 📊`)
                .setDescription(`
전체를 1로 하고 비율을 계산하는 경우가 있다.\n
이 때, 전체를 1로 하는 것보다 100이라고 하면 이미지를 떠올리기 쉽다.\n
퍼센트(percent)는 합성어로, 그 이름의 유래는 'per centum' 이다. 기호는 %를 사용한다.\n
'centum'은 '백 개'를 의미하는 라틴어로, 대표적으로는 센티미터(centimeter)에 쓰인다. 
`)
                .addFields(
                    { name: '**🛠️ 기호**', value: `%`, inline: true },
                    { name: '**💼 접두어 사용**', value: `❌ 불가능`, inline: true },
                    { name: '**📖 내용**', value: `📊 백분율의 단위`, inline: true }
                )
                .setTimestamp()

            return interaction.reply({ embeds: [Embed] });

        } else if (interaction.options.getString('단위') === "‰" || interaction.options.getString('단위') === "퍼밀" || interaction.options.getString('단위') === "천분율") {

            var Embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`📊 **퍼밀(permill): 전체 수량을 1000으로 하여 그것에 대해 가지는 비율 (천분율)** 📊`)
                .setDescription(`
도로의 경사도와 같은 표지판을 보면 보통 백분율로 표시하는 것을 볼 수 있다.\n
이는 '수평거리로 100m를 이동할 때의 수직 거리 변화량'을 기록한 것이다.\n
하지만, 매우 작은 경사도 주행에 치명적인 영향을 끼치는 철도의 경우는 백분율이 아닌, 천분율로 표시한다.\n\n
천분율의 단위는 '천 개마다'를 뜻하는 라틴어 'per mile'에서 유래되었다.\n
따라서 1‰은 0.1%이다. 경사도가 1‰이라면 1km를 주행했을 때 수직거리가 1m 변화한다는 이야기이다.
                `)
                .addFields(
                    { name: '**🛠️ 기호**', value: `%`, inline: true },
                    { name: '**💼 접두어 사용**', value: `❌ 불가능`, inline: true },
                    { name: '**📖 내용**', value: `📊 천분율의 단위`, inline: true }
                )
                .setTimestamp()

            return interaction.reply({ embeds: [Embed] });

        }
    }
}