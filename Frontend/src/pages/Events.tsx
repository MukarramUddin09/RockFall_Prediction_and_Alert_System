import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Eye,
  Download,
  Settings,
  BookOpen,
  Database,
  Filter,
  Search,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock event data - ready for backend integration
const mockEvents = [
  {
    id: 1,
    timestamp: new Date("2024-01-15T14:30:00"),
    nodeId: "Node-07",
    eventType: "Rockfall",
    magnitude: "Large",
    verified: true,
    confidence: 96,
    description: "Confirmed rockfall event with significant debris",
    location: "Sector A-3",
    weatherConditions: "Heavy rainfall, 15mm/h",
    sensorData: {
      vibration: 245,
      tilt: 18.7,
      temperature: 12.3,
    },
    labels: ["training_data", "validated", "high_impact"],
  },
  {
    id: 2,
    timestamp: new Date("2024-01-12T09:15:00"),
    nodeId: "Node-12",
    eventType: "Minor Slide",
    magnitude: "Small",
    verified: true,
    confidence: 87,
    description: "Small debris slide, no major impact",
    location: "Sector B-1",
    weatherConditions: "Light rain, 3mm/h",
    sensorData: {
      vibration: 89,
      tilt: 12.1,
      temperature: 16.8,
    },
    labels: ["training_data", "validated"],
  },
  {
    id: 3,
    timestamp: new Date("2024-01-08T22:45:00"),
    nodeId: "Node-03",
    eventType: "False Positive",
    magnitude: "None",
    verified: false,
    confidence: 34,
    description: "Sensor triggered by equipment maintenance",
    location: "Sector A-1",
    weatherConditions: "Clear, no precipitation",
    sensorData: {
      vibration: 156,
      tilt: 3.2,
      temperature: 18.9,
    },
    labels: ["false_positive", "maintenance"],
  },
  {
    id: 4,
    timestamp: new Date("2024-01-05T16:20:00"),
    nodeId: "Node-15",
    eventType: "Rockfall",
    magnitude: "Medium",
    verified: true,
    confidence: 91,
    description: "Moderate rockfall, blocked access path",
    location: "Sector C-2",
    weatherConditions: "Moderate rain, 8mm/h",
    sensorData: {
      vibration: 198,
      tilt: 15.4,
      temperature: 14.7,
    },
    labels: ["training_data", "validated", "access_blocked"],
  },
];

const mockDatasetStats = {
  totalEvents: 847,
  validatedEvents: 723,
  trainingEvents: 698,
  falsePositives: 62,
  lastExport: "3 days ago",
  datasetSize: "2.3 GB",
};

export default function Events() {
  const [isTrainingMode, setIsTrainingMode] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const getMagnitudeColor = (magnitude: string) => {
    switch (magnitude) {
      case "Large":
        return "status-critical";
      case "Medium":
        return "status-warning";
      case "Small":
        return "bg-chart-primary";
      default:
        return "bg-muted";
    }
  };

  const getEventTypeColor = (eventType: string) => {
    switch (eventType) {
      case "Rockfall":
        return "status-critical";
      case "Minor Slide":
        return "status-warning";
      case "False Positive":
        return "bg-muted";
      default:
        return "bg-chart-primary";
    }
  };

  const filteredEvents = mockEvents.filter((event) => {
    if (filterType !== "all" && event.eventType !== filterType) {
      return false;
    }
    if (
      searchTerm &&
      !event.nodeId.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !event.location.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
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
            Events & Training Mode
          </h1>
          <p className="text-muted-foreground">
            Historical event timeline and research dataset management
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={isTrainingMode ? "default" : "outline"}
            size="sm"
            onClick={() => setIsTrainingMode(!isTrainingMode)}
          >
            {isTrainingMode ? (
              <ToggleRight className="w-4 h-4 mr-2" />
            ) : (
              <ToggleLeft className="w-4 h-4 mr-2" />
            )}
            {isTrainingMode ? "Training Mode" : "User Mode"}
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Dataset
          </Button>
        </div>
      </div>

      {/* Mode Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-4 rounded-lg border ${
          isTrainingMode
            ? "bg-chart-primary/10 border-chart-primary/30"
            : "bg-muted/50 border-border"
        }`}
      >
        <div className="flex items-center gap-3">
          {isTrainingMode ? (
            <BookOpen className="w-5 h-5 text-chart-primary" />
          ) : (
            <Eye className="w-5 h-5 text-muted-foreground" />
          )}
          <div>
            <h3 className="font-semibold">
              {isTrainingMode ? "Research/Training Mode" : "User Mode"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isTrainingMode
                ? "Showing all events with labels and training data for research purposes"
                : "Showing validated events and confirmed alerts for operational use"}
            </p>
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="timeline">Event Timeline</TabsTrigger>
          <TabsTrigger value="dataset">Dataset Management</TabsTrigger>
          <TabsTrigger value="analysis">Event Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-4 mt-6">
          {/* Filters and Search */}
          <div className="flex items-center gap-4 p-4 bg-card border rounded-lg">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by node or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Event Type:</span>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Rockfall">Rockfall</SelectItem>
                  <SelectItem value="Minor Slide">Minor Slide</SelectItem>
                  <SelectItem value="False Positive">False Positive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Events List */}
          <div className="space-y-4">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="monitoring-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge className={getEventTypeColor(event.eventType)}>
                            {event.eventType}
                          </Badge>
                          <Badge className={getMagnitudeColor(event.magnitude)} variant="outline">
                            {event.magnitude}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {event.nodeId} • {event.location}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {event.timestamp.toLocaleString()}
                          </span>
                        </div>

                        <h3 className="font-medium text-lg mb-2">
                          {event.description}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <div className="text-xl font-bold text-chart-primary">
                              {event.sensorData.vibration}μg
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Vibration
                            </div>
                          </div>
                          <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <div className="text-xl font-bold text-chart-secondary">
                              {event.sensorData.tilt}°
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Tilt
                            </div>
                          </div>
                          <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <div className="text-xl font-bold text-chart-tertiary">
                              {event.confidence}%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Confidence
                            </div>
                          </div>
                          <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <div className="text-xl font-bold">
                              {event.sensorData.temperature}°C
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Temperature
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <span className="text-sm font-medium">Weather: </span>
                            <span className="text-sm text-muted-foreground">
                              {event.weatherConditions}
                            </span>
                          </div>
                          {isTrainingMode && (
                            <div>
                              <span className="text-sm font-medium">Labels: </span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {event.labels.map((label, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {label}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        {isTrainingMode && (
                          <Button variant="outline" size="sm">
                            <Settings className="w-4 h-4 mr-2" />
                            Edit Labels
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

        <TabsContent value="dataset" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="monitoring-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Events
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-chart-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {mockDatasetStats.totalEvents.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    All recorded events
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
                    Validated Events
                  </CardTitle>
                  <BookOpen className="h-4 w-4 text-chart-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {mockDatasetStats.validatedEvents.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Expert verified events
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
                    Dataset Size
                  </CardTitle>
                  <Database className="h-4 w-4 text-chart-tertiary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {mockDatasetStats.datasetSize}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Training data size
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="monitoring-card">
              <CardHeader>
                <CardTitle>Dataset Export Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-medium mb-2">Training Dataset</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Validated events with labels for ML training
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">
                        {mockDatasetStats.trainingEvents} events
                      </span>
                      <Button size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-medium mb-2">Complete Dataset</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      All events including unvalidated data
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">
                        {mockDatasetStats.totalEvents} events
                      </span>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-3">Export Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Format</label>
                      <Select defaultValue="csv">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="csv">CSV</SelectItem>
                          <SelectItem value="json">JSON</SelectItem>
                          <SelectItem value="parquet">Parquet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Date Range</label>
                      <Select defaultValue="all">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Time</SelectItem>
                          <SelectItem value="year">Last Year</SelectItem>
                          <SelectItem value="month">Last Month</SelectItem>
                          <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="monitoring-card">
              <CardHeader>
                <CardTitle>Event Statistics Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Event Type Distribution</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Rockfall Events</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-muted rounded">
                            <div className="w-[65%] h-2 bg-status-critical rounded" />
                          </div>
                          <span className="text-sm font-medium">65%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Minor Slides</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-muted rounded">
                            <div className="w-[23%] h-2 bg-status-warning rounded" />
                          </div>
                          <span className="text-sm font-medium">23%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">False Positives</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-muted rounded">
                            <div className="w-[12%] h-2 bg-muted-foreground rounded" />
                          </div>
                          <span className="text-sm font-medium">12%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Seasonal Patterns</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Spring (Mar-May)</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-muted rounded">
                            <div className="w-[45%] h-2 bg-chart-primary rounded" />
                          </div>
                          <span className="text-sm font-medium">45%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Summer (Jun-Aug)</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-muted rounded">
                            <div className="w-[18%] h-2 bg-chart-secondary rounded" />
                          </div>
                          <span className="text-sm font-medium">18%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Fall (Sep-Nov)</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-muted rounded">
                            <div className="w-[25%] h-2 bg-chart-tertiary rounded" />
                          </div>
                          <span className="text-sm font-medium">25%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Winter (Dec-Feb)</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-muted rounded">
                            <div className="w-[12%] h-2 bg-chart-warning rounded" />
                          </div>
                          <span className="text-sm font-medium">12%</span>
                        </div>
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