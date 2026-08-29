"use client";

import { useState, ChangeEvent } from "react";
import { Box, Tabs, Tab, TextField, Grid, MenuItem, Avatar, Button } from "@mui/material";
import { Typography } from "@mui/material";
import UploadIcon from "@mui/icons-material/CloudUploadOutlined";
import { BiodataFormData } from "@/lib/types";

type Props = {
  data: BiodataFormData;
  onChange: (data: BiodataFormData) => void;
};

const tabs = ["Photo & Personal", "Education & Career", "Family", "Contact & About"];

export default function BiodataForm({ data, onChange }: Props) {
  const [tab, setTab] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const set = <K extends keyof BiodataFormData>(section: K, patch: Partial<BiodataFormData[K]>) => {
    onChange({ ...data, [section]: { ...(data[section] as any), ...patch } });
  };

  const onPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange({ ...data, photoDataUrl: reader.result as string });
    reader.readAsDataURL(file);
  };

  return (
    <Box>
    
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3, borderBottom: "1px solid", borderColor: "divider" }}
      >
        {tabs.map((t) => (
          <Tab key={t} label={t} sx={{ fontSize: 13, textTransform: "none", fontWeight: 600 }} />
        ))}
      </Tabs>

      {tab === 0 && (
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar src={data.photoDataUrl || undefined} variant="rounded" sx={{ width: 64, height: 80 }} />
            <Button component="label" size="small" variant="outlined" startIcon={<UploadIcon fontSize="small" />}>
              Upload photo
              <input hidden type="file" accept="image/*" onChange={onPhoto} />
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth size="small" label="Full Name"
              value={data.personal.fullName}
              onChange={(e) => set("personal", { fullName: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth size="small" label="Date of Birth" type="date" InputLabelProps={{ shrink: true }}
              value={data.personal.dob}
              onChange={(e) => set("personal", { dob: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth size="small" label="Time of Birth" type="time" InputLabelProps={{ shrink: true }}
              value={data.personal.timeOfBirth}
              onChange={(e) => set("personal", { timeOfBirth: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth size="small" label="Place of Birth"
              value={data.personal.placeOfBirth}
              onChange={(e) => set("personal", { placeOfBirth: e.target.value })}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth size="small" label="Height" placeholder="5 ft 6 in"
              value={data.personal.height}
              onChange={(e) => set("personal", { height: e.target.value })}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth size="small" label="Weight" placeholder="60 kg"
              value={data.personal.weight}
              onChange={(e) => set("personal", { weight: e.target.value })}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth size="small" label="Complexion"
              value={data.personal.complexion}
              onChange={(e) => set("personal", { complexion: e.target.value })}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth size="small" label="Blood Group"
              value={data.personal.bloodGroup}
              onChange={(e) => set("personal", { bloodGroup: e.target.value })}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              fullWidth size="small" select label="Marital Status"
              value={data.personal.maritalStatus}
              onChange={(e) => set("personal", { maritalStatus: e.target.value })}
            >
              {["Never Married", "Divorced", "Widowed", "Awaiting Divorce"].map((o) => (
                <MenuItem key={o} value={o}>{o}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              fullWidth size="small" select label="Manglik"
              value={data.personal.manglik}
              onChange={(e) => set("personal", { manglik: e.target.value })}
            >
              {["No", "Yes", "Anshik", "Don't Know"].map((o) => (
                <MenuItem key={o} value={o}>{o}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth size="small" select label="Diet"
              value={data.personal.diet}
              onChange={(e) => set("personal", { diet: e.target.value })}
            >
              {["Vegetarian", "Non-Vegetarian", "Eggetarian", "Vegan"].map((o) => (
                <MenuItem key={o} value={o}>{o}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              fullWidth size="small" label="Religion"
              value={data.personal.religion}
              onChange={(e) => set("personal", { religion: e.target.value })}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              fullWidth size="small" label="Caste"
              value={data.personal.caste}
              onChange={(e) => set("personal", { caste: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth size="small" label="Gothra"
              value={data.personal.gothra}
              onChange={(e) => set("personal", { gothra: e.target.value })}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              fullWidth size="small" label="Rashi"
              value={data.personal.rashi}
              onChange={(e) => set("personal", { rashi: e.target.value })}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              fullWidth size="small" label="Nakshatra"
              value={data.personal.nakshatra}
              onChange={(e) => set("personal", { nakshatra: e.target.value })}
            />
          </Grid>
        </Grid>
      )}

      {tab === 1 && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth size="small" label="Highest Qualification"
              value={data.education.qualification}
              onChange={(e) => set("education", { qualification: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth size="small" label="Occupation"
              value={data.education.occupation}
              onChange={(e) => set("education", { occupation: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth size="small" label="Company / Organisation"
              value={data.education.company}
              onChange={(e) => set("education", { company: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth size="small" label="Annual Income"
              value={data.education.income}
              onChange={(e) => set("education", { income: e.target.value })}
            />
          </Grid>
        </Grid>
      )}

      {tab === 2 && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth size="small" label="Father's Name"
              value={data.family.fatherName}
              onChange={(e) => set("family", { fatherName: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth size="small" label="Father's Occupation"
              value={data.family.fatherOccupation}
              onChange={(e) => set("family", { fatherOccupation: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth size="small" label="Mother's Name"
              value={data.family.motherName}
              onChange={(e) => set("family", { motherName: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth size="small" label="Mother's Occupation"
              value={data.family.motherOccupation}
              onChange={(e) => set("family", { motherOccupation: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth size="small" label="Siblings" placeholder="1 elder brother (married)"
              value={data.family.siblings}
              onChange={(e) => set("family", { siblings: e.target.value })}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth size="small" select label="Family Type"
              value={data.family.familyType}
              onChange={(e) => set("family", { familyType: e.target.value })}
            >
              {["Nuclear", "Joint"].map((o) => (
                <MenuItem key={o} value={o}>{o}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth size="small" select label="Family Values"
              value={data.family.familyValues}
              onChange={(e) => set("family", { familyValues: e.target.value })}
            >
              {["Traditional", "Moderate", "Liberal"].map((o) => (
                <MenuItem key={o} value={o}>{o}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth size="small" label="Family Status"
              value={data.family.familyStatus}
              onChange={(e) => set("family", { familyStatus: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth size="small" label="Native Place"
              value={data.family.nativePlace}
              onChange={(e) => set("family", { nativePlace: e.target.value })}
            />
          </Grid>
        </Grid>
      )}

      {tab === 3 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth size="small" label="Address"
              value={data.contact.address}
              onChange={(e) => set("contact", { address: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth size="small" label="City"
              value={data.contact.city}
              onChange={(e) => set("contact", { city: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth size="small" label="Phone"
              value={data.contact.phone || data.contact.mobile}
              onChange={(e) => set("contact", { phone: e.target.value, mobile: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth size="small" label="State"
              value={data.contact.state}
              onChange={(e) => set("contact", { state: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth size="small" label="Email"
              value={data.contact.email}
              onChange={(e) => set("contact", { email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth size="small" label="Contact Person"
              value={data.contact.contactPerson}
              onChange={(e) => set("contact", { contactPerson: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth size="small" multiline minRows={3} label="About Me"
              placeholder="A few lines about your personality, interests, and what you're looking for..."
              value={data.about}
              onChange={(e) => onChange({ ...data, about: e.target.value })}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
