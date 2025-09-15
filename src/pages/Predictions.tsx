import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Brain,
  Clock,
  TrendingUp,
  Filter,
  Download,
  Bell,
  Eye,
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

// Mock prediction data - ready for ML engine integration
const mockPredictions = [
  {
    id: 1,
    nodeId: "Node-07",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    riskScore: 0.89,
    alertFlag: true,
    confidence: 94,
    prediction: "High probability of rockfall within 6 hours",
    factors: ["Vibration spike", "Weather conditions", "Historical pattern"],
    location: "Sector A-3",
    severity: "critical",
  },
  {
    id: 2,
    nodeId: "Node-12",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    riskScore: 0.67,
    alertFlag: true,
    confidence: 78,
    prediction: "Elevated risk - monitor closely",
    factors: ["Gradual tilt increase", "Soil moisture"],
    location: "Sector B-1",
    severity: "warning",
  },
  {
    id: 3,
    nodeId: "Node-18",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    riskScore: 0.43,
    alertFlag: false,
    confidence: 86,
    prediction: "Moderate activity - normal range",
    factors: ["Stable readings", "No weather influence"],
    location: "Sector C-2",
    severity: "info",
  },
  {
    id: 4,
    nodeId: "Node-03",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    riskScore: 0.21,
    alertFlag: false,
    confidence: 92,
    prediction: "Low risk - stable conditions",
    factors: ["Consistent measurements", "Good weather"],
    location: "Sector A-1",
    severity: "safe",
  },
];

const mockModelStats = {
  totalPredictions: 1247,
  accuracy: 94.2,
  lastTraining: "2 days ago",
  modelVersion: "v2.3.1",
  activeModels: 3,
};

export default function Predictions() {
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [filterTimeframe, setFilterTimeframe] = useState("24h");

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "status-critical";
      case "warning":
        return "status-warning";
      case "safe":
        return "status-safe";
      default:
        return "bg-muted";
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 0.8) return "text-status-critical";
    if (score >= 0.6) return "text-status-warning";
    if (score >= 0.4) return "text-chart-primary";
    return "text-status-safe";
  };

  const filteredPredictions = mockPredictions.filter((prediction) => {
    if (filterSeverity !== "all" && prediction.severity !== filterSeverity) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            ML Predictions & Alerts
          </h1>
          <p className="text-muted-foreground">
            AI-powered rockfall risk assessment and early warning system
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Critical Alerts Banner */}
      {mockPredictions.some((p) => p.alertFlag && p.severity === "critical") && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-status-critical/10 border border-status-critical/30 rounded-lg p-4"
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-status-critical" />
            <div>
              <h3 className="font-semibold text-foreground">
                Critical Risk Alert Active
              </h3>
              <p className="text-sm text-muted-foreground">
                ML model predicts high probability rockfall at Node-07. Risk
                score: 89%
              </p>
            </div>
            <Button variant="destructive" size="sm" className="ml-auto">
              <Bell className="w-4 h-4 mr-2" />
              Acknowledge
            </Button>
          </div>
        </motion.div>
      )}

      <Tabs defaultValue="predictions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="predictions">Predictions Feed</TabsTrigger>
          <TabsTrigger value="analytics">Model Analytics</TabsTrigger>
          <TabsTrigger value="settings">Alert Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-4 mt-6">
          {/* Filters */}
          <div className="flex items-center gap-4 p-4 bg-card border rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Filter by:</span>
              <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="safe">Safe</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Timeframe:</span>
              <Select value={filterTimeframe} onValueChange={setFilterTimeframe}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">1 Hour</SelectItem>
                  <SelectItem value="6h">6 Hours</SelectItem>
                  <SelectItem value="24h">24 Hours</SelectItem>
                  <SelectItem value="7d">7 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Predictions List */}
          <div className="space-y-4">
            {filteredPredictions.map((prediction, index) => (
              <motion.div
                key={prediction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="monitoring-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge className={getSeverityColor(prediction.severity)}>
                            {prediction.nodeId}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {prediction.location}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {prediction.timestamp.toLocaleString()}
                          </span>
                        </div>

                        <h3 className="font-medium text-lg mb-2">
                          {prediction.prediction}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <div
                              className={`text-2xl font-bold ${getRiskScoreColor(
                                prediction.riskScore
                              )}`}
                            >
                              {(prediction.riskScore * 100).toFixed(0)}%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Risk Score
                            </div>
                          </div>
                          <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <div className="text-2xl font-bold text-chart-primary">
                              {prediction.confidence}%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Confidence
                            </div>
                          </div>
                          <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <div
                              className={`text-2xl font-bold ${
                                prediction.alertFlag
                                  ? "text-status-critical"
                                  : "text-status-safe"
                              }`}
                            >
                              {prediction.alertFlag ? "ALERT" : "NORMAL"}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Status
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">
                            Contributing Factors:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {prediction.factors.map((factor, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {factor}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Details
                        </Button>
                        {prediction.alertFlag && (
                          <Button variant="destructive" size="sm">
                            <Bell className="w-4 h-4 mr-2" />
                            Alert
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="monitoring-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Model Accuracy
                  </CardTitle>
                  <Brain className="h-4 w-4 text-chart-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-chart-primary">
                    {mockModelStats.accuracy}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Last 30 days validation
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="monitoring-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Predictions
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-chart-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {mockModelStats.totalPredictions.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    All time predictions
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="monitoring-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Model Version
                  </CardTitle>
                  <Clock className="h-4 w-4 text-chart-tertiary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {mockModelStats.modelVersion}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Updated {mockModelStats.lastTraining}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="monitoring-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Models
                  </CardTitle>
                  <Brain className="h-4 w-4 text-chart-warning" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {mockModelStats.activeModels}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Ensemble prediction
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="monitoring-card">
              <CardHeader>
                <CardTitle>Model Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Prediction Accuracy by Risk Level</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">High Risk (80-100%)</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-muted rounded">
                            <div className="w-[92%] h-2 bg-status-critical rounded" />
                          </div>
                          <span className="text-sm font-medium">92%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Medium Risk (50-79%)</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-muted rounded">
                            <div className="w-[87%] h-2 bg-status-warning rounded" />
                          </div>
                          <span className="text-sm font-medium">87%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Low Risk (0-49%)</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-muted rounded">
                            <div className="w-[96%] h-2 bg-status-safe rounded" />
                          </div>
                          <span className="text-sm font-medium">96%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="monitoring-card">
              <CardHeader>
                <CardTitle>Alert Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Risk Score Thresholds</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">Critical Alert</div>
                        <div className="text-xs text-muted-foreground">
                          Immediate attention required
                        </div>
                      </div>
                      <div className="text-status-critical font-medium">≥ 80%</div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">Warning Alert</div>
                        <div className="text-xs text-muted-foreground">
                          Increased monitoring
                        </div>
                      </div>
                      <div className="text-status-warning font-medium">≥ 60%</div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">Info Alert</div>
                        <div className="text-xs text-muted-foreground">
                          General awareness
                        </div>
                      </div>
                      <div className="text-chart-primary font-medium">≥ 40%</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Notification Settings</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">Email Notifications</span>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">SMS Alerts</span>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">Dashboard Notifications</span>
                      <Button variant="outline" size="sm">Configure</Button>
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