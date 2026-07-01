import * as React from 'react'
import {
  Body, Button, Container, Head, Heading, Html, Preview,
  Section, Text, Hr, Row, Column,
} from '@react-email/components'

interface WelcomeEmailProps {
  nombreTitular: string; nombreMascota: string; numeroPoliza: string;
  emailAcceso: string; passwordAcceso: string; tipoPoliza: string; appUrl?: string;
}

export const WelcomeEmail = ({
  nombreTitular, nombreMascota, numeroPoliza, emailAcceso, passwordAcceso,
  tipoPoliza, appUrl = 'https://kivo-web-seven.vercel.app/login',
}: WelcomeEmailProps) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Bienvenido a KIVO — tus credenciales y póliza nº {numeroPoliza}</Preview>
    <Body style={main}>
      <Section style={header}>
        <Text style={logoText}>KIVO SEGUROS</Text>
        <Text style={tagline}>Protegemos lo que más quieres</Text>
      </Section>
      <Container style={container}>
        <Heading style={h1}>¡Bienvenido, {nombreTitular}!</Heading>
        <Text style={text}>Tu póliza para <strong>{nombreMascota}</strong> está activa.</Text>
        <Section style={infoBox}>
          <Row><Column style={label}>N� Póliza</Column><Column style={val}>{numeroPoliza}</Column></Row>
          <Row><Column style={label}>Mascota</Column><Column style={val}>{nombreMascota}</Column></Row>
          <Row><Column style={label}>Plan</Column><Column style={val}>{tipoPoliza}</Column></Row>
        </Section>
        <Hr style={hr} />
        <Heading style={h2}>Tus datos de acceso</Heading>
        <Section style={credBox}>
          <Row><Column style={clab}>Usuario</Column><Column style={cval}>{emailAcceso}</Column></Row>
          <Row><Column style={clab}>Contraseña</Column><Column style={cval}>{psswordAcceso}</Column></Row>
        </Section>
        <Button style={btn} href={appUrl}>Acceder a mi área de cliente →</Button>
        <Text style={foot}>KIVO Seguros, S.L. · Agencia de Suscripción · Regulada por la DGSFP</Text>
      </Container>
    </Body>
  </Html>
)
export default WelcomeEmail

const NAVY='#1B2A4A',TEAL='#3DBFA0'
const main={backgroundColor:'#F0F4F8',fontFamily:'Helvetica,Neue,Arial,sans-serif'}
const header={backgroundColor:NAVY,padding:'28px 40px 20px'textAlign:'center' as const}
const logoText={fontSize:'26px',fontWeight:'800' as const,letterSpacing:'2px',color:'#FFFFFF',margin:'0'}
const tagline={fontSize:'12px',color:TEAL,letterSpacing:'1px',margin:'4px 0 0'}
const container={backgroundColor:'#FFFFFF',margin:'0 auto',maxWidth:'600px',padding:'40px 48px',borderBottom:`4px solid ${TEAL}`}
const h1={fontSize:'24px',fontWeight:' 700' as const,color:NAVY,margin:'0 0 16px'}
const h2={fontSize:'18px',fontWeight:'700' as const,color:NAVY,margin:'24px 0 12px'}
const text={fontSize:'15px',color:'#374151',lineHeight:'1.6',margin:'0 0 20px'}
const infoBox={backgroundColor:'#F7F9FC',borderRadius:'8px',padding:'16px 20px',margin:'0 0 24px'}
const label={fontSize:'12px',color:'#64748B',textTransform:'uppercase' as const,fontWeight:'600' as const,width:'120px',paddingBottom:'8px'}
const val={fontSize:'14px',color:NAVY,fontWeight:'600' as const,paddingBottom:'8px'}
const hr={borderColor:'#E5E7EB',margin:'24px 0'}
const credBox={backgroundColor:NAVY,borderRadius:'8px',padding:'20px 24px',margin:'0 0 24px'}
const clab={fontSize:'11px',color:TEAL,textTransform:'uppercase' as const,fontWeight:'700' as const,width:'100px'}
const cval={fontSize:'15px',color:'#FFFFFF',fontWeight:' 600' as const}
const btn={backgroundColor:TEAL,color:'#FFFFFF',0,fontSize:'15px',fontWeight:'700' as const,borderRadius:'8px',padding:'14px 28px',textDecoration:'none',display:'inline-block',margin:'0 0 32px'}
const foot={fontSize:'12px',color:'#64748B',margin:'24px 0 0'}
