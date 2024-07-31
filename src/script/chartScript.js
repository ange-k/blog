import { Chart } from 'chart.js/auto';

const getChartColors = (isDark) => ({
  backgroundColor: isDark ? 'rgba(75, 192, 192, 0.6)' : 'rgba(75, 192, 192, 0.6)',
  borderColor: isDark ? 'rgba(75, 192, 192, 1)' : 'rgba(75, 192, 192, 1)',
  textColor: isDark ? '#E5E7EB' : '#1F2937'
});

const createChart = (isDark) => {
  const colors = getChartColors(isDark);
  const ctx = document.getElementById('skillChart');
  if (ctx instanceof HTMLCanvasElement) {
      // スキルデータとカテゴリーの定義
      const skills = [
          { name: 'Java',             years: 11, category: 'language' },
          { name: 'JavaScript',       years: 9, category: 'language' },
          { name: 'TypeScript',       years: 5, category: 'language' },
          { name: 'Node.js',          years: 4, category: 'runtime' },
          { name: 'Ruby',             years: 5, category: 'language' },
          { name: 'Python',           years: 5, category: 'language' },
          { name: 'C',                years: 5, category: 'language' },
          { name: 'C++',              years: 3, category: 'language' },
          { name: 'Perl',             years: 2, category: 'language' },
          { name: 'SpringBoot',       years: 6, category: 'framework' },
          { name: 'SpringBoot Webflux',       years: 3, category: 'framework' },
          { name: 'React',            years: 4, category: 'framework' },
          { name: 'Next.js',          years: 3, category: 'framework' },
          { name: 'Vue.js',           years: 3, category: 'framework' },
          { name: 'Nuxt.js',          years: 3, category: 'framework' },
          { name: 'Ruby on Rails',    years: 3, category: 'framework' },
          { name: 'FatAPI',           years: 2, category: 'framework' },
          { name: 'Oracle',           years: 7, category: 'datastore' },
          { name: 'PostgreSQL',       years: 4, category: 'datastore' },
          { name: 'MySQL',            years: 3, category: 'datastore' },
          { name: 'Redis',            years: 2, category: 'datastore' },
          { name: 'AWS',              years: 5, category: 'cloud' },
          { name: 'Docker',           years: 7, category: 'tool' },
          { name: 'k8s',              years: 1, category: 'tool' },
          { name: 'Chef',             years: 3, category: 'tool' },
          { name: 'Ansible',          years: 2, category: 'tool' },
          { name: 'telegraf',         years: 3, category: 'tool' },
          { name: 'FluentBit',        years: 2, category: 'tool' },
          { name: 'ELK Stack',        years: 2, category: 'tool' },
          { name: 'LangChain',        years: 1, category: 'tool' },
          { name: 'CentOS',           years: 6, category: 'os' },
          { name: 'Ubuntu',           years: 2, category: 'os' },
      ]

      // カテゴリーごとの色の定義
      const categoryColors = {
          language: { bg: 'rgba(255, 99, 132, 0.6)', border: 'rgb(255, 99, 132)' },
          framework: { bg: 'rgba(54, 162, 235, 0.6)', border: 'rgb(54, 162, 235)' },
          runtime: { bg: 'rgba(255, 206, 86, 0.6)', border: 'rgb(255, 206, 86)' },
          tool: { bg: 'rgba(75, 192, 192, 0.6)', border: 'rgb(75, 192, 192)' },
          cloud: { bg: 'rgba(153, 102, 255, 0.6)', border: 'rgb(153, 102, 255)' },
          datastore: { bg: 'rgba(255, 159, 64, 0.6)', border: 'rgb(255, 159, 64)' },
          position: { bg: 'rgba(201, 203, 207, 0.6)', border: 'rgb(201, 203, 207)' },
          os: { bg: 'rgba(100, 255, 218, 0.6)', border: 'rgb(100, 255, 218)' }
      };

      // スキルごとの色を生成
      const backgroundColors = skills.map(skill => categoryColors[skill.category].bg);
      const borderColors = skills.map(skill => categoryColors[skill.category].border);

      return new Chart(ctx, {
          type: 'bar',
          data: {
              labels: skills.map(skill => skill.name),
              datasets: [{
                  barPercentage: 0.5,
                  categoryPercentage: 0.8,
                  label: 'Years of Experience',
                  data: skills.map(skill => skill.years),
                  backgroundColor: backgroundColors,
                  borderColor: borderColors,
                  borderWidth: 1,
                  _meta: skills.map(skill => ({ category: skill.category })) // カテゴリー情報を保存
              }]
          },
          options: {
              indexAxis: 'y',
              scales: {
                  x: {
                      beginAtZero: true,
                      title: {
                          display: true,
                          text: 'Years',
                          color: colors.textColor
                      },
                      ticks: {
                          color: colors.textColor
                      }
                  },
                  y: {
                      ticks: {
                          color: colors.textColor
                      }
                  }
              },
              plugins: {
                  legend: {
                      display: false
                  },
                  tooltip: {
                      callbacks: {
                          label: function(context) {
                              const skill = skills[context.dataIndex];
                              return `${skill.name} (${skill.category}): ${skill.years} years`;
                          }
                      }
                  }
              },
          }
      });
  } else {
      console.error('Canvas element not found or not ready');
  }
};

const updateChartTheme = (chart, isDark) => {
  if (chart === undefined) {
      return
  }
  const colors = getChartColors(isDark);
  const skills = chart.data.labels.map((label, index) => ({
      name: label,
      years: chart.data.datasets[0].data[index],
      category: chart.data.datasets[0]._meta[index].category // カテゴリー情報を保存
  }));

  // カテゴリーごとの色の定義
  const categoryColors = {
      language: { bg: 'rgba(255, 99, 132, 0.6)', border: 'rgb(255, 99, 132)' },
      framework: { bg: 'rgba(54, 162, 235, 0.6)', border: 'rgb(54, 162, 235)' },
      runtime: { bg: 'rgba(255, 206, 86, 0.6)', border: 'rgb(255, 206, 86)' },
      tool: { bg: 'rgba(75, 192, 192, 0.6)', border: 'rgb(75, 192, 192)' },
      cloud: { bg: 'rgba(153, 102, 255, 0.6)', border: 'rgb(153, 102, 255)' },
      datastore: { bg: 'rgba(255, 159, 64, 0.6)', border: 'rgb(255, 159, 64)' },
      position: { bg: 'rgba(201, 203, 207, 0.6)', border: 'rgb(201, 203, 207)' },
      os: { bg: 'rgba(100, 255, 218, 0.6)', border: 'rgb(100, 255, 218)' }
  };

  // スキルごとの色を再生成
  const backgroundColors = skills.map(skill => categoryColors[skill.category].bg);
  const borderColors = skills.map(skill => categoryColors[skill.category].border);

  chart.data.datasets[0].backgroundColor = backgroundColors;
  chart.data.datasets[0].borderColor = borderColors;
  chart.options.scales.x.title.color = colors.textColor;
  chart.options.scales.x.ticks.color = colors.textColor;
  chart.options.scales.y.ticks.color = colors.textColor;
  chart.update();
};

const setUpChart = () => {
    const isDark = document.documentElement.classList.contains('dark');
    const chart = createChart(isDark);

    // テーマ切り替えの監視
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const isDark = document.documentElement.classList.contains('dark');
                updateChartTheme(chart, isDark);
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
    });
}

const setup = () => {
    console.log('setup chart')
    setUpChart();
}

if (window.swup) {
    setup()
} else {
    document.addEventListener('swup:enable', setup)
}