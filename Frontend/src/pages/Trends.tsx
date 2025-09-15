import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Calendar,
  BarChart3,
  LineChart,
  Download,
  Settings,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrendChart } from "@/components/charts/TrendChart";

// Mock historical data - ready for backend time-series integration
const mockTimeSeriesData = {
  vibration: [
    { timestamp: "2024-01-01", value: 23 },
    { timestamp: "2024-01-02", value: 34 },
    { timestamp: "2024-01-03", value: 28 },
    { timestamp: "2024-01-04", value: 45 },
    { timestamp: "2024-01-05", value: 67 },
    { timestamp: "2024-01-06", value: 89 },
    { timestamp: "2024-01-07", value: 156 },
  ],
  tilt: [
    { timestamp: "2024-01-01", value: 2.1 },
    { timestamp: "2024-01-02", value: 2.3 },
    { timestamp: "2024-01-03", value: 2.8 },
    { timestamp: "2024-01-04", value: 4.5 },
    { timestamp: "2024-01-05", value: 6.7 },
    { timestamp: "2024-01-06", value: 8.9 },
    { timestamp: "2024-01-07", value: 12.3 },
  ],
  rainfall: [
    { timestamp: "2024-01-01", value: 0.0 },
    { timestamp: "2024-01-02", value: 2.3 },
    { timestamp: "2024-01-03", value: 5.7 },
    { timestamp: "2024-01-04", value: 12.1 },
    { timestamp: "2024-01-05", value: 8.4 },
    { timestamp: "2024-01-06", value: 15.2 },
    { timestamp: "2024-01-07", value: 23.8 },
  ],
};

const mockNodes = [
  "Node-01",
  "Node-03",
  "Node-07",
  "Node-12",
  "Node-15",
  "Node-18",
];

export default function Trends() {
  const [selectedNode, setSelectedNode] = useState("Node-07");
  const [timeframe, setTimeframe] = useState("7d");
  const [selectedMetric, setSelectedMetric] = useState("vibration");

  const getMetricUnit = (metric: string) => {
    switch (metric) {
      case "vibration":
        return "μg";
      case "tilt":
        return "°";
      case "rainfall":
        return "mm";
      case "temperature":
        return "°C";
      default:
        return "";
    }
  };

  const getMetricColor = (metric: string) => {
    switch (metric) {
      case "vibration":
        return "chart-primary";
      case "tilt":
        return "chart-secondary";
      case "rainfall":
        return "chart-tertiary";
      case "temperature":
        return "chart-warning";
      default:
        return "chart-primary";
    }
  };

  const getCurrentData = () => {
    return mockTimeSeriesData[selectedMetric as keyof typeof mockTimeSeriesData] || [];
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Historical Trends
          </h1>
          <p className="text-muted-foreground">
            Time-series analysis of sensor data and environmental conditions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Data Selection Controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 p-4 bg-card border rounded-lg"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Node:</span>
          <Select value={selectedNode} onValueChange={setSelectedNode}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {mockNodes.map((node) => (
                <SelectItem key={node} value={node}>
                  {node}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Timeframe:</span>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">24 Hours</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
              <SelectItem value="90d">90 Days</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Metric:</span>
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vibration">Vibration</SelectItem>
              <SelectItem value="tilt">Tilt Angle</SelectItem>
              <SelectItem value="rainfall">Rainfall</SelectItem>
              <SelectItem value="temperature">Temperature</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      <Tabs defaultValue="charts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="charts">Time Series Charts</TabsTrigger>
          <TabsTrigger value="correlation">Correlation Analysis</TabsTrigger>
          <TabsTrigger value="statistics">Statistical Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="charts" className="space-y-4 mt-6">
          {/* Main Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="monitoring-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <LineChart className="w-5 h-5" />
                    {selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} Trend - {selectedNode}
                  </div>
                  <Badge variant="outline">
                    {timeframe.toUpperCase()}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TrendChart
                  data={getCurrentData()}
                  metric={selectedMetric}
                  unit={getMetricUnit(selectedMetric)}
                  color={`hsl(var(--${getMetricColor(selectedMetric)}))`}
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="monitoring-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Current Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold text-${getMetricColor(selectedMetric)}`}>
                    {getCurrentData().slice(-1)[0]?.value}{getMetricUnit(selectedMetric)}
                  </div>
                  <p className="text-xs text-muted-foreground">Latest reading</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="monitoring-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Average</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-chart-secondary">
                    {(getCurrentData().reduce((sum, point) => sum + point.value, 0) / getCurrentData().length).toFixed(1)}
                    {getMetricUnit(selectedMetric)}
                  </div>
                  <p className="text-xs text-muted-foreground">Period average</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="monitoring-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Maximum</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-status-warning">
                    {Math.max(...getCurrentData().map(point => point.value)).toFixed(1)}
                    {getMetricUnit(selectedMetric)}
                  </div>
                  <p className="text-xs text-muted-foreground">Peak value</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="monitoring-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-status-critical">
                    <TrendingUp className="w-6 h-6 inline mr-1" />
                    +{(((getCurrentData().slice(-1)[0]?.value || 0) - (getCurrentData()[0]?.value || 0)) / (getCurrentData()[0]?.value || 1) * 100).toFixed(0)}%
                  </div>
                  <p className="text-xs text-muted-foreground">Period change</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Multi-metric comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="monitoring-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Multi-Metric Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
                    <p className="text-sm text-muted-foreground">
                      Comparative chart showing vibration, tilt, and environmental data
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="correlation" className="space-y-4 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="monitoring-card">
              <CardHeader>
                <CardTitle>Correlation Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Vibration vs Weather</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm">Rainfall Correlation</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-muted rounded">
                            <div className="w-[78%] h-2 bg-status-critical rounded" />
                          </div>
                          <span className="text-sm font-medium">0.78</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm">Temperature Correlation</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-muted rounded">
                            <div className="w-[34%] h-2 bg-status-warning rounded" />
                          </div>
                          <span className="text-sm font-medium">0.34</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm">Wind Speed Correlation</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-muted rounded">
                            <div className="w-[23%] h-2 bg-chart-primary rounded" />
                          </div>
                          <span className="text-sm font-medium">0.23</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Tilt vs Environmental</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm">Soil Moisture</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-muted rounded">
                            <div className="w-[65%] h-2 bg-status-warning rounded" />
                          </div>
                          <span className="text-sm font-medium">0.65</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm">Vibration</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-muted rounded">
                            <div className="w-[89%] h-2 bg-status-critical rounded" />
                          </div>
                          <span className="text-sm font-medium">0.89</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm">Atmospheric Pressure</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-muted rounded">
                            <div className="w-[12%] h-2 bg-chart-primary rounded" />
                          </div>
                          <span className="text-sm font-medium">0.12</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-4 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="monitoring-card">
              <CardHeader>
                <CardTitle>Statistical Summary - {selectedNode}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Vibration Statistics</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Mean</span>
                        <span className="text-sm font-medium">67.4 μg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Median</span>
                        <span className="text-sm font-medium">45.2 μg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Std Deviation</span>
                        <span className="text-sm font-medium">34.7 μg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Min / Max</span>
                        <span className="text-sm font-medium">12 / 156 μg</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Tilt Statistics</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Mean</span>
                        <span className="text-sm font-medium">5.7°</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Median</span>
                        <span className="text-sm font-medium">4.5°</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Std Deviation</span>
                        <span className="text-sm font-medium">3.8°</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Min / Max</span>
                        <span className="text-sm font-medium">1.2 / 12.3°</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Data Quality</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Data Points</span>
                        <span className="text-sm font-medium">1,247</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Missing Values</span>
                        <span className="text-sm font-medium">23 (1.8%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Outliers</span>
                        <span className="text-sm font-medium">14 (1.1%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Coverage</span>
                        <span className="text-sm font-medium">98.2%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}