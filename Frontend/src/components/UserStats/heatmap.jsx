import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

function Heatmap({ dailyCounts }) {
  const today = new Date();
  const yearAgo = new Date(today);
  yearAgo.setFullYear(today.getFullYear() - 1);

  // Transform { "2025-07-01": 4, ... } → [{ date: "2025-07-01", count: 4 }, ...]
  const heatmapValues = Object.entries(dailyCounts).map(([date, count]) => ({
    date,
    count
  }));

  return (
    <>
    <h1 className='py-2 text-center'>Submission Heat Map</h1>
    <CalendarHeatmap
      startDate={yearAgo}
      endDate={today}
      values={heatmapValues}
      classForValue={(value) => {
        if (!value) return 'color-empty';
        if (value.count >= 4) return 'color-github-4';
        if (value.count >= 3) return 'color-github-3';
        if (value.count >= 2) return 'color-github-2';
        return 'color-github-1';
      }}
      tooltipDataAttrs={value => value.date ? { 'data-tip': `${value.date}: ${value.count} submissions` } : {}}
      showWeekdayLabels
    />
    </>
  );
}
export default Heatmap