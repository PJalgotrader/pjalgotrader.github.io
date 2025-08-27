// Presidential Election Visualization with D3.js

class ElectionMap {
    constructor() {
        this.width = 960;
        this.height = 600;
        this.margin = { top: 20, right: 20, bottom: 20, left: 20 };
        this.currentYear = "2020";
        this.animationPlaying = false;
        
        // Sample election data - in a real implementation, this would come from an API
        this.electionData = {
            "2020": {
                "Alabama": { winner: "Republican", margin: 25.4, dem_votes: 849624, rep_votes: 1441170, electoral_votes: 9 },
                "Alaska": { winner: "Republican", margin: 10.1, dem_votes: 153778, rep_votes: 189951, electoral_votes: 3 },
                "Arizona": { winner: "Democratic", margin: 0.3, dem_votes: 1672143, rep_votes: 1661686, electoral_votes: 11 },
                "California": { winner: "Democratic", margin: 29.2, dem_votes: 11110250, rep_votes: 6006429, electoral_votes: 55 },
                "Florida": { winner: "Republican", margin: 3.4, dem_votes: 5297045, rep_votes: 5668731, electoral_votes: 29 },
                "Georgia": { winner: "Democratic", margin: 0.2, dem_votes: 2473633, rep_votes: 2461854, electoral_votes: 16 },
                "Illinois": { winner: "Democratic", margin: 17.4, dem_votes: 3471915, rep_votes: 2446891, electoral_votes: 20 },
                "Michigan": { winner: "Democratic", margin: 2.8, dem_votes: 2804040, rep_votes: 2649852, electoral_votes: 16 },
                "Nevada": { winner: "Democratic", margin: 2.4, dem_votes: 703486, rep_votes: 669890, electoral_votes: 6 },
                "New York": { winner: "Democratic", margin: 23.1, dem_votes: 5244886, rep_votes: 3244798, electoral_votes: 29 },
                "North Carolina": { winner: "Republican", margin: 1.3, dem_votes: 2684292, rep_votes: 2758775, electoral_votes: 15 },
                "Ohio": { winner: "Republican", margin: 8.0, dem_votes: 2679165, rep_votes: 3154834, electoral_votes: 18 },
                "Pennsylvania": { winner: "Democratic", margin: 1.2, dem_votes: 3458229, rep_votes: 3377674, electoral_votes: 20 },
                "Texas": { winner: "Republican", margin: 5.6, dem_votes: 5259126, rep_votes: 5890347, electoral_votes: 38 },
                "Virginia": { winner: "Democratic", margin: 10.1, dem_votes: 2413568, rep_votes: 1962430, electoral_votes: 13 },
                "Washington": { winner: "Democratic", margin: 19.2, dem_votes: 2369612, rep_votes: 1584651, electoral_votes: 12 },
                "Wisconsin": { winner: "Democratic", margin: 0.7, dem_votes: 1630866, rep_votes: 1610184, electoral_votes: 10 }
            },
            "2016": {
                "Arizona": { winner: "Republican", margin: 3.5, dem_votes: 1161167, rep_votes: 1252401, electoral_votes: 11 },
                "California": { winner: "Democratic", margin: 30.1, dem_votes: 8753788, rep_votes: 4483810, electoral_votes: 55 },
                "Florida": { winner: "Republican", margin: 1.2, dem_votes: 4504975, rep_votes: 4617886, electoral_votes: 29 },
                "Georgia": { winner: "Republican", margin: 5.1, dem_votes: 1877963, rep_votes: 2089104, electoral_votes: 16 },
                "Michigan": { winner: "Republican", margin: 0.2, dem_votes: 2268839, rep_votes: 2279543, electoral_votes: 16 },
                "Pennsylvania": { winner: "Republican", margin: 0.7, dem_votes: 2926441, rep_votes: 2970733, electoral_votes: 20 },
                "Wisconsin": { winner: "Republican", margin: 0.8, dem_votes: 1382536, rep_votes: 1405284, electoral_votes: 10 }
            }
        };

        this.init();
    }

    init() {
        // Create SVG container
        this.svg = d3.select("#election-map")
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .style("background", "#f8fafc");

        // Create tooltip
        this.tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style("background", "rgba(0, 0, 0, 0.8)")
            .style("color", "white")
            .style("padding", "10px")
            .style("border-radius", "5px")
            .style("font-size", "12px")
            .style("pointer-events", "none");

        // Set up event listeners
        this.setupControls();

        // Create initial visualization
        this.createVisualization();
    }

    setupControls() {
        // Year selector
        d3.select("#yearSelect").on("change", (event) => {
            this.currentYear = event.target.value;
            this.updateVisualization();
        });

        // Animation toggle
        d3.select("#toggleAnimation").on("click", () => {
            this.toggleAnimation();
        });
    }

    createVisualization() {
        // Create a simple representation of states as circles for demonstration
        // In a full implementation, you would load TopoJSON data for actual state shapes
        
        const states = Object.keys(this.electionData[this.currentYear]);
        const statesPerRow = 6;
        const circleRadius = 30;
        const spacing = 80;
        
        this.stateGroups = this.svg.selectAll(".state-group")
            .data(states)
            .enter()
            .append("g")
            .attr("class", "state-group")
            .attr("transform", (d, i) => {
                const row = Math.floor(i / statesPerRow);
                const col = i % statesPerRow;
                const x = col * spacing + 80;
                const y = row * spacing + 80;
                return `translate(${x}, ${y})`;
            });

        // Add circles for states
        this.stateGroups.append("circle")
            .attr("class", "state-circle")
            .attr("r", circleRadius)
            .attr("stroke", "#333")
            .attr("stroke-width", 1)
            .style("cursor", "pointer");

        // Add state labels
        this.stateGroups.append("text")
            .attr("class", "state-label")
            .attr("text-anchor", "middle")
            .attr("dy", "0.35em")
            .style("font-size", "10px")
            .style("font-weight", "bold")
            .style("fill", "white")
            .style("pointer-events", "none")
            .text(d => d.substring(0, 2).toUpperCase());

        // Add interactivity
        this.stateGroups
            .on("mouseover", (event, d) => this.showTooltip(event, d))
            .on("mouseout", () => this.hideTooltip())
            .on("mousemove", (event) => this.moveTooltip(event));

        // Initial coloring
        this.updateVisualization();
    }

    updateVisualization() {
        const data = this.electionData[this.currentYear];
        
        this.stateGroups.select(".state-circle")
            .transition()
            .duration(750)
            .attr("fill", d => {
                const stateData = data[d];
                if (!stateData) return "#ccc";
                
                const baseColor = stateData.winner === "Democratic" ? "#3b82f6" : "#ef4444";
                const intensity = Math.min(stateData.margin / 30, 1); // Normalize margin to 0-1
                return d3.color(baseColor).darker(1 - intensity);
            });
    }

    showTooltip(event, stateName) {
        const data = this.electionData[this.currentYear][stateName];
        if (!data) return;

        const totalVotes = data.dem_votes + data.rep_votes;
        const demPercent = ((data.dem_votes / totalVotes) * 100).toFixed(1);
        const repPercent = ((data.rep_votes / totalVotes) * 100).toFixed(1);

        this.tooltip
            .html(`
                <strong>${stateName}</strong><br/>
                <strong>Winner:</strong> ${data.winner}<br/>
                <strong>Margin:</strong> ${data.margin.toFixed(1)}%<br/>
                <strong>Electoral Votes:</strong> ${data.electoral_votes}<br/>
                <hr style="margin: 5px 0;">
                <strong>Democratic:</strong> ${data.dem_votes.toLocaleString()} (${demPercent}%)<br/>
                <strong>Republican:</strong> ${data.rep_votes.toLocaleString()} (${repPercent}%)
            `)
            .style("visibility", "visible");
    }

    hideTooltip() {
        this.tooltip.style("visibility", "hidden");
    }

    moveTooltip(event) {
        this.tooltip
            .style("top", (event.pageY - 10) + "px")
            .style("left", (event.pageX + 10) + "px");
    }

    toggleAnimation() {
        if (this.animationPlaying) {
            this.stopAnimation();
        } else {
            this.startAnimation();
        }
    }

    startAnimation() {
        this.animationPlaying = true;
        d3.select("#toggleAnimation")
            .html('<i class="fas fa-pause"></i> Stop Animation');

        const years = Object.keys(this.electionData);
        let currentIndex = years.indexOf(this.currentYear);

        this.animationInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % years.length;
            this.currentYear = years[currentIndex];
            
            // Update the select element
            d3.select("#yearSelect").property("value", this.currentYear);
            
            this.updateVisualization();
        }, 2000);
    }

    stopAnimation() {
        this.animationPlaying = false;
        d3.select("#toggleAnimation")
            .html('<i class="fas fa-play"></i> Toggle Animation');
        
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }
    }
}

// Initialize the visualization when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if we're on the visualizations page
    if (document.getElementById('election-map')) {
        new ElectionMap();
    }
});