"use client"

import { useState } from "react"
import { AlertTriangle, ArrowLeft, ArrowRight, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function Reaction() {
    // View states
    const [currentView, setCurrentView] = useState<"dashboard" | "reactivation">("dashboard")

    // Modal states
    const [showShareModal, setShowShareModal] = useState(false)
    const [showActionNotPermitted, setShowActionNotPermitted] = useState(false)
    const [email, setEmail] = useState("")

    const handleBeginReactivation = () => {
        setCurrentView("reactivation")
        setShowShareModal(false)
        setShowActionNotPermitted(false)
    }

    const handleShareWithFrontDesk = () => {
        setShowShareModal(true)
        setShowActionNotPermitted(false)
    }

    const handleShareList = () => {
        setShowShareModal(false)
        setShowActionNotPermitted(true)
    }

    const closeAllModals = () => {
        setShowShareModal(false)
        setShowActionNotPermitted(false)
    }

    const goToDashboard = () => {
        setCurrentView("dashboard")
    }

    // Dashboard View
    const DashboardView = () => (
        <Card className="pt-0 px-0">
            <CardHeader className="space-y-3">
                <div className="inline-flex w-fit items-center px-4 py-2 rounded-full text-sm font-medium bg-black text-white mb-2">
                    📊 The Results
                </div>
                <CardTitle className="text-xl text-[#111827] font-normal">
                    You have <span className="font-bold">$345,900</span> worth of inactive customers
                </CardTitle>
                <CardDescription className="text-black  ">
                We found <span className="font-semibold"> 56 dormant customers </span> who haven’t used your service in over a year—with an average spend of <span className="font-semibold">$6,201</span>, These customers will require your service again, 
                by reactivating them could earn you over <span className="font-semibold">$345,900.</span>
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="font-bold mb-2 text-[13px]">Here's an example:</h3>
                    <div className="flex items-start gap-3 bg-[#FAFAFA] p-3 rounded-lg">
                        <div className="text-amber-500 mt-1">👉</div>
                        <div>
                            <p>
                                <span className="font-semibold">Tom Smith </span>spent{" "}
                                <span className="font-semibold">$18,800 last year</span> on landscaping services last year.
                                They will likely need your service again soon. You should begin to reactivate them before a competitor does.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="cursor-pointer hover:bg-gray-50 transition-colors" onClick={handleBeginReactivation}>
                        <CardContent className="p-4 flex flex-col gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <span className="text-xl">👥</span>
                            </div>
                            <div>
                                <h3 className="font-medium">Begin Reactivation Using Grunt</h3>
                                <p className="text-sm text-gray-500">Grunt automatically contacts your old customers via text and phone to get them to rebook your services — no manual work needed.</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="cursor-pointer hover:bg-gray-50 transition-colors" onClick={handleShareWithFrontDesk}>
                        <CardContent className="p-4 flex flex-col gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-medium">Manual Reactivation</h3>
                                <p className="text-sm text-gray-500">Export a list with customer names, phone numbers, and the services they most likely need — so you can follow up manually.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </CardContent></Card>

    )

    // Reactivation View (Auto Pilot Configuration)
    const ReactivationView = () => (
        <Card className="rounded-md">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <Button variant="ghost" size="sm" onClick={goToDashboard} className="mb-2">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                    <Button onClick={closeAllModals} className="w-fit h-9">
                        Save Settings
                    </Button>
                </div>
                <CardTitle className="font-normal">Auto Pilot Configuration</CardTitle>
                <CardDescription>Configure how Grunt will handle the customer reactivation process.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Run System Every */}
                <div className="space-y-2">
                    <Label htmlFor="frequency">Run System Every</Label>
                    <Select defaultValue="everyday">
                        <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="everyday">Everyday</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Mode */}
                <div className="space-y-2">
                    <Label htmlFor="mode">Mode</Label>
                    <Select defaultValue="sales">
                        <SelectTrigger>
                            <SelectValue placeholder="Select mode" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="sales">Sales Mode</SelectItem>
                            <SelectItem value="education">Follow Up Mode</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Mode descriptions */}
                <div className="space-y-2 text-sm text-gray-600">
                    <p>Sales Mode – Go all-in on converting. Grunt will do everything it can to get customers to book before they go with a competitor.</p>
                    <p>Follow Up Mode – Reconnect with old customers using timely reminders and promotions to get them booking again.</p>
                </div>

                {/* Custom Instructions */}
                <div className="space-y-2">
                    <Label htmlFor="instructions">Give it some custom instructions</Label>
                    <textarea
                        id="instructions"
                        className="w-full min-h-[100px] p-3 border rounded-md"
                        placeholder="For example: Offer the customer a 10% off to get them to book instantly."
                    />
                </div>
                

                {/* Maximum attempts */}
                <div className="space-y-2">
                    <Label htmlFor="attempts">Set how many times the system should attempt to reach each customer.</Label>
                    <Input id="attempts" type="number" defaultValue={1} />
                </div>

                {/* Notify front desk */}
                <div className="flex items-center space-x-2">
                    <Checkbox id="notify" />
                    <Label htmlFor="notify" className="text-sm font-normal">
                        Notify me when customer engages with reactivation outreach.
                    </Label>
                </div>

                {/* Save button */}
                {/* <div className="pt-4">
                    <Button onClick={goToDashboard} className="w-full">
                        Save Settings
                    </Button>
                </div> */}
            </CardContent>
        </Card>
    )

    return (
        <div>
            {currentView === "dashboard" ? <DashboardView /> : <ReactivationView />}

            {/* Share With Front Desk Modal */}
            <Dialog open={showShareModal} onOpenChange={setShowShareModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <div className="flex items-center justify-center mb-2">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-2">
                                <Mail className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium">Customer Reactivation Demo</span>
                        </div>
                        <DialogTitle>Download Customer Reactivation List</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleShareList} className="w-full">
                            Download List
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Action Not Permitted Modal */}
            <Dialog open={showActionNotPermitted} onOpenChange={setShowActionNotPermitted}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Action Not Permitted</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <div className="flex items-start gap-3 mb-4">
                            <div className="text-amber-500 mt-1">
                                <AlertTriangle className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="mb-1">This action is not allowed in this demo</p>
                                <p className="text-sm text-gray-500">Please create an account to complete this action.</p>
                            </div>
                        </div>
                    </div>

                </DialogContent>
            </Dialog>
        </div>
    )
}
