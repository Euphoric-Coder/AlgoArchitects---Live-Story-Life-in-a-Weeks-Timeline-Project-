import jsPDF from 'jspdf';

export class TimelinePDFExporter {
  constructor(options) {
    this.pdf = new jsPDF({
      orientation: options.orientation,
      unit: 'mm',
      format: options.pageSize
    });

    const pageSize = this.pdf.internal.pageSize;
    this.pageWidth = pageSize.getWidth();
    this.pageHeight = pageSize.getHeight();

    this.margin = 20;
    this.currentY = this.margin;
    this.lineHeight = 5;
  }

  addNewPage() {
    this.pdf.addPage();
    this.currentY = this.margin;
  }

  checkPageBreak(requiredHeight) {
    if (this.currentY + requiredHeight > this.pageHeight - this.margin) {
      this.addNewPage();
    }
  }

  addTitle(title, fontSize = 20) {
    this.pdf.setFontSize(fontSize);
    this.pdf.setFont('helvetica', 'bold');
    console.log(title)
    this.pdf.text(title, this.margin, this.currentY);
    this.currentY += fontSize * 0.5;
  }

  addSubtitle(subtitle, fontSize = 14) {
    this.pdf.setFontSize(fontSize);
    this.pdf.setFont('helvetica', 'normal');
    this.pdf.setTextColor(100, 100, 100);
    this.pdf.text(subtitle, this.margin, this.currentY);
    this.pdf.setTextColor(0, 0, 0);
    this.currentY += fontSize * 0.5;
  }

  addText(text, fontSize = 10, isBold = false) {
    this.pdf.setFontSize(fontSize);
    this.pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
    
    const lines = this.pdf.splitTextToSize(text, this.pageWidth - 2 * this.margin);
    lines.forEach((line) => {
      this.checkPageBreak(this.lineHeight);
      this.pdf.text(line, this.margin, this.currentY);
      this.currentY += this.lineHeight;
    });
  }

  addSpacer(height = 5) {
    this.currentY += height;
  }

  addHorizontalLine() {
    this.checkPageBreak(5);
    this.pdf.setDrawColor(200, 200, 200);
    this.pdf.line(this.margin, this.currentY, this.pageWidth - this.margin, this.currentY);
    this.currentY += 5;
  }

  getCategoryColor(type) {
    const colors = {
      milestone: [147, 51, 234], // Purple
      career: [16, 185, 129],    // Emerald
      personal: [59, 130, 246],  // Blue
      travel: [6, 182, 212],     // Cyan
      global: [245, 158, 11]     // Amber
    };
    return colors[type] || [100, 100, 100];
  }

  addEventCard(event, options) {
    const cardHeight = 25;
    this.checkPageBreak(cardHeight);

    const startY = this.currentY;
    const [r, g, b] = this.getCategoryColor(event.type);

    // Card background
    this.pdf.setFillColor(248, 250, 252);
    this.pdf.rect(this.margin, startY, this.pageWidth - 2 * this.margin, cardHeight, 'F');

    // Category color bar
    if (options.colorScheme === 'color') {
      this.pdf.setFillColor(r, g, b);
    } else {
      this.pdf.setFillColor(100, 100, 100);
    }
    this.pdf.rect(this.margin, startY, 3, cardHeight, 'F');

    // Event content
    const contentX = this.margin + 8;
    let contentY = startY + 6;

    // Title
    this.pdf.setFontSize(12);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.setTextColor(0, 0, 0);
    this.pdf.text(event.title, contentX, contentY);

    // Date and category
    contentY += 5;
    this.pdf.setFontSize(9);
    this.pdf.setFont('helvetica', 'normal');
    this.pdf.setTextColor(100, 100, 100);
    const dateText = new Date(event.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    this.pdf.text(`${dateText} • Week ${event.week} • ${event.type.charAt(0).toUpperCase() + event.type.slice(1)}`, contentX, contentY);

    // Description
    if (options.includeEventDetails && event.description) {
      contentY += 5;
      this.pdf.setFontSize(9);
      this.pdf.setTextColor(60, 60, 60);
      const descLines = this.pdf.splitTextToSize(event.description, this.pageWidth - 2 * this.margin - 15);
      descLines.slice(0, 2).forEach((line) => {
        this.pdf.text(line, contentX, contentY);
        contentY += 4;
      });
    }

    this.currentY += cardHeight + 3;
  }

  addTimelineVisualization(eventsByYear, options) {
    this.addTitle('Timeline Visualization', 16);
    this.addSpacer(5);

    const years = Object.keys(eventsByYear).map(Number).sort();
    const startYear = Math.min(...years);
    const endYear = Math.max(...years);
    
    const timelineWidth = this.pageWidth - 2 * this.margin;
    const timelineHeight = 40;
    const yearWidth = timelineWidth / (endYear - startYear + 1);

    this.checkPageBreak(timelineHeight + 20);

    // Timeline background
    this.pdf.setFillColor(248, 250, 252);
    this.pdf.rect(this.margin, this.currentY, timelineWidth, timelineHeight, 'F');

    // Year markers and events
    years.forEach((year, index) => {
      const x = this.margin + index * yearWidth;
      const events = eventsByYear[year] || [];

      // Year label
      this.pdf.setFontSize(10);
      this.pdf.setFont('helvetica', 'bold');
      this.pdf.setTextColor(0, 0, 0);
      this.pdf.text(year.toString(), x + yearWidth/2 - 8, this.currentY - 2);

      // Year line
      this.pdf.setDrawColor(200, 200, 200);
      this.pdf.line(x, this.currentY, x, this.currentY + timelineHeight);

      // Event indicators
      if (events.length > 0) {
        const eventHeight = Math.min(timelineHeight - 10, events.length * 3);
        const eventY = this.currentY + 5;

        if (options.colorScheme === 'color') {
          // Group events by type and show colored bars
          const eventsByType = events.reduce((acc, event) => {
            if (!acc[event.type]) acc[event.type] = 0;
            acc[event.type]++;
            return acc;
          }, {});

          let barY = eventY;
          Object.entries(eventsByType).forEach(([type, count]) => {
            const [r, g, b] = this.getCategoryColor(type);
            this.pdf.setFillColor(r, g, b);
            const barHeight = (count / events.length) * eventHeight;
            this.pdf.rect(x + 5, barY, yearWidth - 10, barHeight, 'F');
            barY += barHeight;
          });
        } else {
          // Simple gray bar for grayscale
          this.pdf.setFillColor(100, 100, 100);
          this.pdf.rect(x + 5, eventY, yearWidth - 10, eventHeight, 'F');
        }

        // Event count
        this.pdf.setFontSize(8);
        this.pdf.setTextColor(255, 255, 255);
        this.pdf.text(events.length.toString(), x + yearWidth/2 - 2, eventY + eventHeight/2 + 1);
      }
    });

    this.currentY += timelineHeight + 15;
  }

  addStatistics(events) {
    this.addTitle('Timeline Statistics', 16);
    this.addSpacer(5);

    const stats = this.calculateStatistics(events);
    
    // Create a 2x3 grid of statistics
    const statBoxWidth = (this.pageWidth - 2 * this.margin - 10) / 2;
    const statBoxHeight = 20;
    
    this.checkPageBreak(statBoxHeight * 3 + 20);

    const statsData = [
      { label: 'Total Events', value: stats.totalEvents.toString(), color: [59, 130, 246] },
      { label: 'Years Covered', value: stats.yearsCovered.toString(), color: [16, 185, 129] },
      { label: 'Major Milestones', value: stats.milestones.toString(), color: [147, 51, 234] },
      { label: 'Career Events', value: stats.careerEvents.toString(), color: [16, 185, 129] },
      { label: 'Personal Events', value: stats.personalEvents.toString(), color: [59, 130, 246] },
      { label: 'Travel Adventures', value: stats.travelEvents.toString(), color: [6, 182, 212] }
    ];

    statsData.forEach((stat, index) => {
      const row = Math.floor(index / 2);
      const col = index % 2;
      const x = this.margin + col * (statBoxWidth + 5);
      const y = this.currentY + row * (statBoxHeight + 5);

      // Stat box background
      this.pdf.setFillColor(248, 250, 252);
      this.pdf.rect(x, y, statBoxWidth, statBoxHeight, 'F');

      // Colored accent
      const [r, g, b] = stat.color;
      this.pdf.setFillColor(r, g, b);
      this.pdf.rect(x, y, 3, statBoxHeight, 'F');

      // Value
      this.pdf.setFontSize(16);
      this.pdf.setFont('helvetica', 'bold');
      this.pdf.setTextColor(0, 0, 0);
      this.pdf.text(stat.value, x + 8, y + 8);

      // Label
      this.pdf.setFontSize(10);
      this.pdf.setFont('helvetica', 'normal');
      this.pdf.setTextColor(100, 100, 100);
      this.pdf.text(stat.label, x + 8, y + 15);
    });

    this.currentY += statBoxHeight * 3 + 20;
  }

  calculateStatistics(events) {
    const years = new Set(events.map(e => e.year));
    const eventsByType = events.reduce((acc, event) => {
      acc[event.type] = (acc[event.type] || 0) + 1;
      return acc;
    }, {});

    return {
      totalEvents: events.length,
      yearsCovered: years.size,
      milestones: eventsByType.milestone || 0,
      careerEvents: eventsByType.career || 0,
      personalEvents: eventsByType.personal || 0,
      travelEvents: eventsByType.travel || 0,
      globalEvents: eventsByType.global || 0
    };
  }

  async exportTimeline(events, options) {
    // Cover page
    this.addTitle('Life Timeline', 24);
    this.addSpacer(5);
    this.addSubtitle('A Visual Journey Through Time', 14);
    this.addSpacer(10);
    
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    this.addText(`Generated on ${currentDate}`, 10);
    this.addSpacer(20);

    // Group events by year
    const eventsByYear = events.reduce((acc, event) => {
      if (!acc[event.year]) acc[event.year] = [];
      acc[event.year].push(event);
      return acc;
    }, {});

    // Sort events within each year by date
    Object.keys(eventsByYear).forEach(year => {
      eventsByYear[parseInt(year)].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    });

    // Add timeline visualization
    if (Object.keys(eventsByYear).length > 0) {
      this.addTimelineVisualization(eventsByYear, options);
    }

    // Add statistics
    if (options.includeStats) {
      this.addStatistics(events);
    }

    // Add events by year
    const years = Object.keys(eventsByYear).map(Number).sort((a, b) => b - a);
    
    years.forEach(year => {
      this.addNewPage();
      this.addTitle(`${year}`, 20);
      this.addSubtitle(`${eventsByYear[year].length} events this year`, 12);
      this.addSpacer(10);

      eventsByYear[year].forEach(event => {
        this.addEventCard(event, options);
      });
    });

    // Add footer to all pages
    const totalPages = this.pdf.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      this.pdf.setPage(i);
      this.pdf.setFontSize(8);
      this.pdf.setTextColor(150, 150, 150);
      this.pdf.text(
        `Life Timeline - Page ${i} of ${totalPages}`,
        this.pageWidth - this.margin - 40,
        this.pageHeight - 10
      );
    }

    // Save the PDF
    const fileName = `life-timeline-${new Date().toISOString().split('T')[0]}.pdf`;
    this.pdf.save(fileName);
  }
}

export const exportTimelineToPDF = async (events, options) => {
  const exporter = new TimelinePDFExporter(options);
  await exporter.exportTimeline(events, options);
};